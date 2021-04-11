import type { AppProps } from 'next/app';

import 'src/styles/tailwind.css';

import AppLayout from 'src/components/AppLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
