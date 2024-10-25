import { FirstLevelMenuItem, MenuItem } from '@/interfaces/menu.interface';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SliderProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mainNav?: FirstLevelMenuItem[];
    menuNav?: MenuItem[];
    page?: number;
    type: 'firstLvl' | 'secondLvl' | null;
}
