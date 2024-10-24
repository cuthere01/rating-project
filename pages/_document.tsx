import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
    return (
        <Html lang="ru">
            <Head>
                {/* Костыль для шрифта */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Rubik+Doodle+Shadow&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

// class MyDocument extends Document {
//     static async getInitialProps(
//         ctx: DocumentContext
//     ): Promise<DocumentInitialProps> {
//         const initialProps = await Document.getInitialProps(ctx);
//         return { ...initialProps };
//     }

//     render(): JSX.Element {
//         return (
//             <Html lang="ru">
//                 <Head />
//                 <body>
//                     <Main />
//                     <NextScript />
//                 </body>
//             </Html>
//         );
//     }
// }

// export default MyDocument;
