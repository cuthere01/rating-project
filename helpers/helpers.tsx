import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { FirstLevelMenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory } from "@/interfaces/page.interface";

export const firstLvlMenu: FirstLevelMenuItem[] = [
    {
        route: "courses",
        name: "Курсы",
        desc: "Узнайте, что говорят о лучших онлайн-курсах для профессионального и личного развития",
        icon: <CoursesIcon />,
        id: TopLevelCategory.Courses,
    },
    {
        route: "services",
        name: "Сервисы",
        desc: "Честные отзывы о популярных сервисах, которые помогают решать повседневные задачи",
        icon: <ServicesIcon />,
        id: TopLevelCategory.Services,
    },
    {
        route: "books",
        name: "Книги",
        desc: "Подборка отзывов на книги разных жанров для вашего вдохновения и роста",
        icon: <BooksIcon />,
        id: TopLevelCategory.Books,
    },
    {
        route: "products",
        name: "Товары",
        desc: "Обзор и оценки востребованных товаров для обоснованного выбора",
        icon: <ProductsIcon />,
        id: TopLevelCategory.Products,
    },
];

export const priceRu = (price: number): string => {
    return price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        .concat(" ₽");
};
    

export const declOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};