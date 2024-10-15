import { useContext, KeyboardEvent } from "react";
import styles from "./Menu.module.css";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLvlMenu } from "@/helpers/helpers";
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 10,
            transition: {
                staggerChildren: 0.025,
            },
        },
        hidden: {
            marginBottom: 0,
        },
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 'auto',
        },
        hidden: {
            opacity: 0,
            height: 0
        },
    };

    const openSecondLevel = (secondCategory: string): void => {
        if (setMenu) {
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory == secondCategory) {
                        m.isOpened = !m.isOpened;
                    }
                    return m;
                })
            );
        }
    };

    const openSecondLevelKey = (
        key: KeyboardEvent,
        secondCategory: string
    ): void => {
        if(key.code === 'Space' || key.code === 'Enter'){
            key.preventDefault();
            openSecondLevel(secondCategory);
        }
    };

    const buildFirstLvl = (): JSX.Element[] => {
        return firstLvlMenu.map((m) => (
            <div key={m.route} className={styles.firstLvl}>
                <Link
                    href={`/${m.route}`}
                    className={classNames(styles.firstLvlLabel, {
                        [styles.firstLvlActive]: m.id == firstCategory,
                    })}
                >
                    {m.icon}
                    <span>{m.name}</span>
                </Link>
                {m.id == firstCategory && buildSecondLvl(m)}
            </div>
        ));
    };

    const buildSecondLvl = (menuItem: FirstLevelMenuItem): JSX.Element => {
        return (
            <div className={styles.secondLvlWrapper}>
                {menu.map((m) => {
                    if (
                        m.pages
                            .map((p) => p.alias)
                            .includes(router.asPath.split("/")[2])
                    ) {
                        m.isOpened = true;
                    }

                    return (
                        <div
                            key={m._id.secondCategory}
                            className={styles.secondLvl}
                        >
                            <div
                                tabIndex={0}
                                onKeyDown={(key: KeyboardEvent) =>
                                    openSecondLevelKey(
                                        key,
                                        m._id.secondCategory
                                    )
                                }
                                className={styles.secondLvlLabel}
                                onClick={() =>
                                    openSecondLevel(m._id.secondCategory)
                                }
                            >
                                {m._id.secondCategory}
                            </div>
                            <motion.div
                                className={classNames(styles.secondLvlBlock)}
                                layout
                                variants={variants}
                                initial={m.isOpened ? "visible" : "hidden"}
                                animate={m.isOpened ? "visible" : "hidden"}
                            >
                                {buildThirdLvl(
                                    m.pages,
                                    menuItem.route,
                                    m.isOpened ?? false
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLvl = (pages: PageItem[], route: string, isOpened: boolean): JSX.Element[] => {
        return pages.map((p) => {
            const path = `/${route}/${p.alias}`;

            return (
                <motion.div key={p._id} variants={variantsChildren}>
                    <Link
                        href={path}
                        className={classNames(styles.thirdLvl, {
                            [styles.thirdLvlActive]: path == router.asPath,
                        })}
                        tabIndex={isOpened ? 0 : -1}
                    >
                        {p.category}
                    </Link>
                </motion.div>
            );
        });
    };

    return (
        <div className={styles.menu} role="navigation">
            {buildFirstLvl()}
        </div>
    );
};
