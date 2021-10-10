import { AppProps } from 'next/dist/shared/lib/router/router';
import { HooksProvider } from '../hooks';
import { GlobalStyle } from '../styles/global';
import { CustomThemeProvider } from '../styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <HooksProvider>
        <div className='general-container'>
          <Component {...pageProps} />
          <ToastContainer pauseOnHover={false} />
        </div>
      </HooksProvider>
      <GlobalStyle />
    </CustomThemeProvider>
  );
}

export default MyApp;
