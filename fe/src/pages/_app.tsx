import { AppProps } from 'next/dist/shared/lib/router/router';
import { GlobalStyle } from '../styles/global';
import { CustomThemeProvider } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <div className='general-container'>
        <Component {...pageProps} />
      </div>
      <GlobalStyle />
    </CustomThemeProvider>
  );
}

export default MyApp;
