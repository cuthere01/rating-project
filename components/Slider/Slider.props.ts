import { FirstLevelMenuItem, MenuItem } from "@/interfaces/menu.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface Page {
    alias: string;
    category: string;
}

export interface PageWithCategory extends Page {
    secondCategory: string;
}

export interface MenuNavItem {
    _id: {
        secondCategory: string;
    };
    pages: Page[];
}

export interface MainNavItem {
    route: string;
    name: string;
    icon?: JSX.Element;
}

export interface SliderProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mainNav?: FirstLevelMenuItem[];
    menuNav?: MenuItem[];
    page?: FirstLevelMenuItem;
    type: "firstLvl" | "secondLvl" | null;
}
