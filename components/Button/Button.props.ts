import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from "react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    appearance: "primary" | "ghost";
    arrow?: "right" | "down" | "none";
}
