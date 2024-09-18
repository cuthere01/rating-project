import { ReviewModel } from '@/interfaces/products.interface';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReviewProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    review: ReviewModel
}
