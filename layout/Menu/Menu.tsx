import { ReactNode, useContext } from "react";
import styles from "./Menu.module.css";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "@/interfaces/page.interface";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const firstLvlMenu: FirstLevelMenuItem[] = [
    {
        route: "courses",
        name: "Курсы",
        icon: <CoursesIcon />,
        id: TopLevelCategory.Courses,
    },
    {
        route: "services",
        name: "Сервисы",
        icon: <ServicesIcon />,
        id: TopLevelCategory.Services,
    },
    {
        route: "books",
        name: "Книги",
        icon: <BooksIcon />,
        id: TopLevelCategory.Books,
    },
    {
        route: "products",
        name: "Товары",
        icon: <ProductsIcon />,
        id: TopLevelCategory.Products,
    },
];

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu &&
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory == secondCategory) {
                        m.isOpened = !m.isOpened;
                    }
                    return m;
                })
            );
    };

    const buildFirstLvl = (): JSX.Element => {
        return (
            <>
                {firstLvlMenu.map((m) => (
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
                ))}
            </>
        );
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
