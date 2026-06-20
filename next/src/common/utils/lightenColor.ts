export const lightenColor = (color: string, percent: number = 30): string => {
  if (!color || typeof color !== 'string') {
    return '#979FC7';
  }
  
  let hex = color.replace('#', '');
  
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  if (!/^[0-9A-F]{6}$/i.test(hex)) {
    return '#979FC7';
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const percentValue = Math.max(0, Math.min(100, percent));
  const newR = Math.round(r + (255 - r) * (percentValue / 100));
  const newG = Math.round(g + (255 - g) * (percentValue / 100));
  const newB = Math.round(b + (255 - b) * (percentValue / 100));
  
  return `#${[newR, newG, newB].map(x => {
    const hex = x.toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
};
