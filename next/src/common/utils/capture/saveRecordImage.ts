type CaptureWindow = Window & {
  ReactNativeWebView?: { postMessage: (message: string) => void };
  __TOOK_IMAGE_SAVE_SUPPORTED__?: boolean;
};

/** Native saves resolve only after the app acknowledges a successful library write. */
export const saveRecordImage = async (blob: Blob, filename: string): Promise<'saved' | 'download'> => {
  const bridge = (window as CaptureWindow).ReactNativeWebView;
  if (bridge) {
    if (!(window as CaptureWindow).__TOOK_IMAGE_SAVE_SUPPORTED__) {
      throw new Error('이미지 저장을 사용하려면 앱을 최신 버전으로 업데이트해 주세요.');
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('이미지를 읽지 못했어요.'));
      reader.readAsDataURL(blob);
    });
    const requestId = crypto.randomUUID();
    await new Promise<void>((resolve, reject) => {
      const finish = (error?: string) => {
        window.clearTimeout(timer);
        window.removeEventListener('took:image-save-result', onResult);
        if (error) reject(new Error(error));
        else resolve();
      };
      const onResult = (event: Event) => {
        const result = (event as CustomEvent<{ requestId: string; success: boolean; message?: string }>).detail;
        if (result?.requestId !== requestId) return;
        finish(result.success ? undefined : result.message || '이미지 저장에 실패했어요.');
      };
      const timer = window.setTimeout(() => finish('저장 결과를 확인하지 못했어요. 사진첩을 확인해 주세요.'), 120_000);
      window.addEventListener('took:image-save-result', onResult);
      try {
        bridge.postMessage(JSON.stringify({ type: 'SAVE_RECORD_IMAGE', requestId, dataUrl }));
      } catch {
        finish('앱에 이미지를 전달하지 못했어요.');
      }
    });
    return 'saved';
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    link.remove();
    // Keep the object URL alive until the browser has consumed the download.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
  return 'download';
};
