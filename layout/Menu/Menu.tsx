import { useContext, KeyboardEvent, useState } from "react";
import styles from "./Menu.module.css";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLvlMenu } from "@/helpers/helpers";
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const shouldReduceMotion = useReducedMotion();
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 10,
            transition: shouldReduceMotion ? {} : {
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
            opacity: shouldReduceMotion ? 1 : 0,
            height: 0
        },
    };

    const openSecondLevel = (secondCategory: string): void => {
        if (setMenu) {
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory == secondCategory) {
                        setAnnounce(m.isOpened ? 'closed' : 'opened');
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

    const buildFirstLvl = (): JSX.Element => {
        return (
            <ul className={styles.menu}>
                {firstLvlMenu.map((m) => (
                    <li
                        key={m.route}
                        className={styles.firstLvl}
                        aria-expanded={m.id == firstCategory}
                    >
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
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLvl = (menuItem: FirstLevelMenuItem): JSX.Element => {
        return (
            <ul className={styles.secondLvlWrapper}>
                {menu.map((m) => {
                    if (
                        m.pages
                            .map((p) => p.alias)
                            .includes(router.asPath.split("/")[2])
                    ) {
                        m.isOpened = true;
                    }

                    return (
                        <li
                            key={m._id.secondCategory}
                            className={styles.secondLvl}
                        >
                            <button
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
                                aria-expanded={m.isOpened}
                            >
                                {m._id.secondCategory}
                            </button>
                            <motion.ul
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
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLvl = (pages: PageItem[], route: string, isOpened: boolean): JSX.Element[] => {
        return pages.map((p) => {
            const path = `/${route}/${p.alias}`;

            return (
                <motion.li key={p._id} variants={variantsChildren}>
                    <Link
                        href={path}
                        className={classNames(styles.thirdLvl, {
                            [styles.thirdLvlActive]: path == router.asPath,
                        })}
                        tabIndex={isOpened ? 0 : -1}
                    >
                        {p.category}
                    </Link>
                </motion.li>
            );
        });
    };

    return (
        <nav role="navigation">
            {announce && <span role='log' className='visuallyHidden'>{announce === 'opened' ? 'развернуто' : 'свернуто'}</span>}
            {buildFirstLvl()}
        </nav>
    );
};
