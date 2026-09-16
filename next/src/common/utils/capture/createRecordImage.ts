/** Capture the current records with a theme-aware frame, without changing the live page. */
export const createRecordImage = async (element: HTMLElement, title: string) => {
  await document.fonts.ready;
  await Promise.all(Array.from(element.querySelectorAll('img')).map(async (image) => {
    if (!image.complete) {
      // Lazy images outside the viewport must load before the full records image is made.
      const originalLoading = image.loading;
      image.loading = 'eager';
      try {
        await image.decode();
      } finally {
        image.loading = originalLoading;
      }
    }
    if (!image.naturalWidth) throw new Error('이미지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
  }));

  const { toCanvas } = await import('html-to-image');
  const styles = getComputedStyle(element);
  const background = `rgb(${styles.getPropertyValue('--theme-bg').trim() || '243 247 252'})`;
  const foreground = styles.color;
  const width = Math.ceil(element.getBoundingClientRect().width);
  const height = Math.ceil(element.scrollHeight);
  if (!width || !height) throw new Error('저장할 기록 영역을 찾을 수 없어요.');
  // Cap long home captures to avoid oversized canvases on mobile devices.
  const padding = 24;
  const headingHeight = title ? 76 : 44;
  const scale = Math.min(2, 4096 / (width + padding * 2), 8192 / (height + headingHeight + padding * 2));
  // Only calendars need a detached visual state; leave the live selection untouched.
  const captureClone = element.querySelector('[data-capture-class]')
    ? element.cloneNode(true) as HTMLElement
    : null;
  let content: HTMLCanvasElement;
  try {
    if (captureClone) {
      captureClone.setAttribute('aria-hidden', 'true');
      Object.assign(captureClone.style, {
        position: 'fixed',
        left: '-100000px',
        top: '0',
        width: `${width}px`,
        pointerEvents: 'none',
      });
      captureClone.querySelectorAll<HTMLElement>('[data-capture-class]').forEach((cell) => {
        cell.className = cell.dataset.captureClass!;
      });
      // Keep the same ancestors so inherited theme styles remain available.
      element.parentElement!.appendChild(captureClone);
    }
    content = await toCanvas(captureClone ?? element, {
      // Next.js image URLs identify each source through query parameters.
      includeQueryParams: true,
      pixelRatio: scale,
      backgroundColor: background,
      width,
      height,
      filter: (node) => !(node instanceof HTMLElement && node.hasAttribute('data-capture-exclude')),
      // A fixed root can disappear inside the SVG foreignObject used by html-to-image.
      // Reset positioning on the library's copy, not on the offscreen live clone.
      style: { position: 'static', margin: '0', transform: 'none', inset: 'auto' },
    });
  } finally {
    captureClone?.remove();
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil((width + padding * 2) * scale);
  canvas.height = Math.ceil((height + headingHeight + padding * 2) * scale);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('이 기기에서는 이미지 저장을 지원하지 않아요.');
  context.scale(scale, scale);
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
  context.fillStyle = foreground;
  context.font = `600 13px ${styles.fontFamily}`;
  context.fillText('TOOK · 나의 기록', padding, padding + 14);
  if (title) {
    context.font = `600 21px ${styles.fontFamily}`;
    context.fillText(title, padding, padding + 46, width);
  }
  context.drawImage(content, padding, padding + headingHeight, width, height);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('이미지를 만들지 못했어요.')), 'image/png');
  });
};
