import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Noto_Sans } from "next/font/google";

const font = Noto_Sans({
    subsets: ["latin", "cyrillic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: '--font-family'
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Rating Project</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                
                
            </Head>
            <div className={font.className}>
                <Component {...pageProps} />
            </div>
        </>
    );
}
