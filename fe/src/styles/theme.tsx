import { ThemeProvider } from 'styled-components';

export const theme = {
  colors: {
    background: '#F6F5FC',
    primary: {
      lighter: '#e0e3ff',
      light: '#6674f4',
      main: '#5061fc',
      dark: '#3346f0',
    },
    gray: {
      900: '#222222',
      200: '#bcbcbc',
    },
    danger: {
      light: '#f97171',
      main: '#fc5050',
      dark: '#f63131',
    },
  },
};

export const CustomThemeProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
