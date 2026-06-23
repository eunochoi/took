// src/hooks/useSettings.ts
import { useContext } from 'react';
import { SettingsContext } from './SettingsContext';

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('사용 위치가 올바르지 않습니다.');
  }
  return context;
}