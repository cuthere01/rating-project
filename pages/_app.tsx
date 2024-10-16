import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Noto_Sans } from "next/font/google";
import ym from 'react-yandex-metrika';
import { YMInitializer } from "react-yandex-metrika";

const font = Noto_Sans({
    subsets: ["latin", "cyrillic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: '--font-family'
});

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
    router.events.on('routeChangeComplete', (url: string) => {
        if(typeof window != 'undefined'){
            ym('hit', url);
        }
    });

    return (
        <>
            <Head>
                <title>Rating Project</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    property="og:url"
                    content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
                />
                <meta
                    property="og:locale"
                    content="ru_RU"
                />
                <link rel="preconnect" href="https://mc.yandex.ru" />
            </Head>
            <YMInitializer 
                accounts={[]}
                options={{ webvisor: true, defer: true }}
                version='2'
            />
            <div className={font.className}>
                <Component {...pageProps} />
            </div>
        </>
    );
}
