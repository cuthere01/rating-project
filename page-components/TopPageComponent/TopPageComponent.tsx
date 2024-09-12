import classnames from "classnames";
import styles from "./TopPageComponent.module.css";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Htag, P, Tag } from "@/components";
import { HhData } from "@/components/HhData/HhData";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { Advantages } from "@/components/Advantages/Advantages";

export const TopPageComponent = ({
    page,
    products,
    firstCategory,
}: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && (
                    <Tag size="m" color="gray">
                        {products.length}
                    </Tag>
                )}
                <span className={styles.sort}>Сортировка</span>
            </div>
            <div>
                {products &&
                    products.map((p) => <div key={p._id}>{p.title}</div>)}
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
                        <Tag size="s" color="primary">
                            {t}
                        </Tag>
                    ))}
                </div>
            </div>
        </div>
    );
};
