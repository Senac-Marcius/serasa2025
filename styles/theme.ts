import { light as evaLight, dark as evaDark } from '@eva-design/eva';

export const customTheme = {
  ...evaLight, // Usa o tema claro como base
  "color-primary-100": "#D6E4FF",
  "color-primary-500": "#3366FF",
  "color-primary-900": "#091A7A",
};

// Alternativa para tema escuro se precisar
export const darkTheme = {
  ...evaDark, 
  "color-primary-100": "#D6E4FF",
  "color-primary-500": "#3366FF",
  "color-primary-900": "#091A7A",
};
