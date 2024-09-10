import { useContext } from "react";
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
                {menu.map((m) => (
                    <div
                        key={m._id.secondCategory}
                        className={styles.secondLvl}
                    >
                        <span className={styles.secondLvlLabel}>
                            {m._id.secondCategory}
                        </span>
                        <div
                            className={classNames(styles.secondLvlBlock, {
                                [styles.secondLvlBlockOpened]: m.isOpened,
                            })}
                        >
                            {buildThirdLvl(m.pages, menuItem.route)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const buildThirdLvl = (pages: PageItem[], route: string): JSX.Element => {
        return (
            <>
                {pages.map((p) => (
                    <Link
                        href={`/${route}/${p.alias}`}
                        className={classNames(styles.thirdLvl, {
                            [styles.thirdLvlActive]: false,
                        })}
                    >
                        {p.category}
                    </Link>
                ))}
            </>
        );
    };

    return <div className={styles.menu}>{buildFirstLvl()}</div>;
};
