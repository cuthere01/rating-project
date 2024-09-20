import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface UpProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
    > {
    children: ReactNode;
}
