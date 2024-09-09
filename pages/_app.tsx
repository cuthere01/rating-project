import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Open_Sans } from "next/font/google";

const font = Open_Sans({ subsets: ["latin"] });

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
