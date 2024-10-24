import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Noto_Sans, Rubik_Doodle_Shadow } from "next/font/google";
import ym from 'react-yandex-metrika';
import { YMInitializer } from "react-yandex-metrika";
import Router from 'next/router';

// const font = Noto_Sans({
//     subsets: ["latin", "cyrillic"],
//     weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//     variable: '--font-family'
// });

// const font1 = Rubik_Doodle_Shadow({
//     subsets: ["latin", "cyrillic"],
//     weight: ["400"],
//     variable: "--font-family",
// });

Router.events.on("routeChangeComplete", (url: string) => {
    if (typeof window != "undefined") {
        ym("hit", url);
    }
});

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
    
    return (
        <>
            <Head>
                <title>Rating Project</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href={
                        (process.env.NEXT_PUBLIC_IS_DEV === "true"
                            ? ""
                            : process.env.NEXT_PUBLIC_DOMAIN) + "/favicon.ico"
                    }
                />
                <meta
                    property="og:url"
                    content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
                />
                <meta property="og:locale" content="ru_RU" />
                <link rel="preconnect" href="https://mc.yandex.ru" />
            </Head>
            <YMInitializer
                accounts={[]}
                options={{ webvisor: true, defer: true }}
                version="2"
            />
            <Component {...pageProps} />
        </>
    );
}
