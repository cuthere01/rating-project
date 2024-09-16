import { SortEnum } from "@/components/Sort/Sort.props";
import styles from "./TopPageComponent.module.css";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Htag, Tag, Advantages, HhData, Sort } from "@/components";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";

export const TopPageComponent = ({
    page,
    products,
    firstCategory,
}: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
        sortReducer,
        { products, sort: SortEnum.Rating }
    );

    const setSort = (sort: SortEnum): void => {
        dispatchSort({ type: sort });
    };

    //исправление, потенциально ухудшающее UX
    useEffect(() => {
        dispatchSort({ type: "RESET_PRODUCTS", payload: products });
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                {page.title && <Htag tag="h1">{page.title}</Htag>}
                {products && (
                    <Tag size="m" color="gray">
                        {products.length}
                    </Tag>
                )}
                {/* <span className={styles.sort}>Сортировка</span> */}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts &&
                    sortedProducts.map(
                        (p) => p.title && <div key={p._id}>{p.title}</div>
                    )}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии – {page.category}</Htag>
                <Tag size="m" color="red">
                    hh.ru
                </Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && (
                <HhData {...page.hh} />
            )}
            {page.advantages && page.advantages.length > 0 && (
                <Advantages advantages={page.advantages} />
            )}
            {page.seoText && (
                <div
                    className={styles.seo}
                    dangerouslySetInnerHTML={{ __html: page.seoText }}
                />
            )}
            <div className={styles.skills}>
                <Htag tag="h2">Получаемые навыки</Htag>
                <div className={styles.tags}>
                    {page.tags.map((t) => (
                        <Tag size="s" color="primary" key={t}>
                            {t}
                        </Tag>
                    ))}
                </div>
            </div>
        </div>
    );
};
