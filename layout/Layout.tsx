import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { FunctionComponent, useRef, useState, KeyboardEvent } from "react";
import { AppContextProvider, IAppContext } from "@/context/app.context";
import { Up } from "@/components";
import classNames from "classnames";

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [isSkipLinkShow, setIsSkipLinkShow] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (key: KeyboardEvent): void => {
        if (key.code === "Space" || key.code === "Enter") {
            key.preventDefault();
            bodyRef.current?.focus();
        }
        setIsSkipLinkShow(false);
    };

    return (
        <div className={styles.wrapper}>
            <a
                onFocus={() => setIsSkipLinkShow(true)}
                tabIndex={1}
                onKeyDown={(key: KeyboardEvent) => skipContentAction(key)}
                className={classNames(styles.skipLink, {
                    [styles.show]: isSkipLinkShow,
                })}
            >Сразу к содержанию</a>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
                {children}
            </main>
            <Footer className={styles.footer} />
            <Up />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext >(
    Component: FunctionComponent<T>
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider
                menu={props.menu}
                firstCategory={props.firstCategory}
            >
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};
