import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface CardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    color?: "white" | "primary";
    children: ReactNode;
}
