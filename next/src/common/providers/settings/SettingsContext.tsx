import { SettingsContextType } from '@/common/types/setting';
import { createContext } from 'react';

export const SettingsContext = createContext<SettingsContextType | null>(null);
