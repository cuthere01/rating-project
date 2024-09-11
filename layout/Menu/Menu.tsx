import { useContext } from "react";
import styles from "./Menu.module.css";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLvlMenu } from "@/helpers/helpers";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

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
        console.log(menu);
        return (
            <div className={styles.secondLvlWrapper}>
                {menu.map((m) => {
                    if (
                        m.pages
                            .map((p) => p.alias)
                            .includes(router.asPath.split("/")[2])
                    ) {
                        console.log(router.asPath.split("/")[2]);
                        m.isOpened = true;
                    }

                    return (
                        <div
                            key={m._id.secondCategory}
                            className={styles.secondLvl}
                        >
                            <div
                                className={styles.secondLvlLabel}
                                onClick={() =>
                                    openSecondLevel(m._id.secondCategory)
                                }
                            >
                                {m._id.secondCategory}
                            </div>
                            <div
                                className={classNames(styles.secondLvlBlock, {
                                    [styles.secondLvlBlockOpened]: m.isOpened,
                                })}
                            >
                                {buildThirdLvl(m.pages, menuItem.route)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLvl = (pages: PageItem[], route: string): JSX.Element => {
        return (
            <>
                {pages.map((p) => {
                    const path = `/${route}/${p.alias}`;

                    return (
                        <Link
                            key={path}
                            href={path}
                            className={classNames(styles.thirdLvl, {
                                [styles.thirdLvlActive]: path == router.asPath,
                            })}
                        >
                            {p.category}
                        </Link>
                    );
                })}
            </>
        );
    };

    return <div className={styles.menu}>{buildFirstLvl()}</div>;
};
