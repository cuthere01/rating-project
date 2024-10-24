import { FirstLevelMenuItem } from '@/interfaces/menu.interface';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SliderProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mainNav?: FirstLevelMenuItem[];
}
