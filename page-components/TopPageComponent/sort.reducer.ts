import { SortEnum } from "@/components/Sort/Sort.props";
import { ProductModel } from "@/interfaces/products.interface";

export type SortActions =
    | { type: SortEnum.Price }
    | { type: SortEnum.Rating }
    | { type: "RESET_PRODUCTS"; payload: ProductModel[] };

export interface SortReducerState {
    sort: SortEnum;
    products: ProductModel[];
}

export const sortReducer = (
    state: SortReducerState,
    action: SortActions
): SortReducerState => {
    switch (action.type) {
        case SortEnum.Rating:
            // нужно продумать сортировку по рейтингу с отзывов и изначальному рейтингу
            // const compareRating = (a: ProductModel, b: ProductModel): number => {
            //     return 0;
            // }
            return {
                sort: SortEnum.Rating,
                products: state.products.sort((a, b) =>
                    a.initialRating > b.initialRating ? -1 : 1
                ),
            };
        case SortEnum.Price:
            return {
                sort: SortEnum.Price,
                products: state.products.sort((a, b) =>
                    a.price > b.price ? 1 : -1
                ),
            };
        case "RESET_PRODUCTS":
            return {
                ...state,
                sort: SortEnum.Rating,
                products: action.payload,
            };
        default:
            throw new Error("Неверный тип сортировки");
    }
};
