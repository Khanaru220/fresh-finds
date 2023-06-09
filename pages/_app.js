import Head from 'next/head';
import Image from 'next/image';
import { AppWrapper } from '@/context/useContext';
import '@/styles/globals.css';
import styles from '@/styles/Home.module.css';
import InitStates from '@/components/common/InitStates';
import NavBarMobile from '@/components/Pages/NavBarMobile';
import Header from '@/components/Pages/Header';
import { useRouter } from 'next/router';

const app = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppWrapper>
        <InitStates />
        <div className={styles.container}>
          <Header />
          <main className={styles.main}>
            <Component {...pageProps} />
          </main>
          {/* <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <span className={styles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer> */}
          {router.pathname !== '/auth' && <NavBarMobile />}
        </div>
      </AppWrapper>
    </>
  );
};

export default app;
