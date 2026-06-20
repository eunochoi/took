const FONT_SIZE_LIST = ['13px', '15px', '17px'];

export const fontSizeUpdate = (type: 'Up' | 'Down') => {
  const savedFontSize = localStorage.getItem('fontSize') ?? '15px';

  const currentIndex = FONT_SIZE_LIST.findIndex((v) => v === savedFontSize);
  const afterIndex = type === 'Up' ? currentIndex + 1 : currentIndex - 1;
  const afterFontSize = FONT_SIZE_LIST[afterIndex];

  if (afterIndex >= 0 && afterIndex < FONT_SIZE_LIST.length) {
    localStorage.setItem('fontSize', afterFontSize);
    document.documentElement.style.setProperty('--font-size-base', afterFontSize);
  }
}