'use client';

import { RefObject, useRef, useState } from 'react';
import { MdSaveAlt } from 'react-icons/md';
import { enqueueSnackbar } from 'notistack';
import { createRecordImage } from '@/common/utils/capture/createRecordImage';
import { saveRecordImage } from '@/common/utils/capture/saveRecordImage';
import TopButton from './TopButton';

interface Props {
  targetRef: RefObject<HTMLElement>;
  disabled?: boolean;
}

const CaptureTopButton = ({ targetRef, disabled = false }: Props) => {
  const [isSaving, setSaving] = useState(false);
  const savingRef = useRef(false);

  const onCapture = async () => {
    if (savingRef.current) return;
    const target = targetRef.current;
    if (!target || target.dataset.captureReady !== 'true') {
      enqueueSnackbar('기록을 모두 불러온 뒤 다시 시도해 주세요.');
      return;
    }
    savingRef.current = true;
    setSaving(true);
    const key = target.dataset.captureKey;
    try {
      const blob = await createRecordImage(target, target.dataset.captureTitle ?? '나의 기록');
      if (!target.isConnected || target.dataset.captureKey !== key || target.dataset.captureReady !== 'true') {
        throw new Error('기록이 변경되었어요. 다시 캡처해 주세요.');
      }
      const result = await saveRecordImage(blob, `took-${key || 'records'}.png`);
      enqueueSnackbar(result === 'saved' ? '이미지 저장이 완료되었습니다.' : '이미지 다운로드를 시작했습니다.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : '이미지 저장에 실패했어요. 다시 시도해 주세요.', { variant: 'error' });
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  return (
    <TopButton onClick={onCapture} disabled={disabled || isSaving} aria-label={isSaving ? '이미지 저장 중' : '기록 이미지 저장'} title="기록 이미지 저장">
      <MdSaveAlt className={isSaving ? 'animate-pulse text-xl' : 'text-xl'} aria-hidden="true" />
    </TopButton>
  );
};

export default CaptureTopButton;
