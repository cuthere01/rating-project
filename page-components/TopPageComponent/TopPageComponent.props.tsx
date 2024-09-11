import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/products.interface";

export interface TopPageComponentProps extends Record<string, unknown> {
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}
