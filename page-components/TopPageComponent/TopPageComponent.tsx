import classnames from "classnames";
import styles from "./TopPageComponent.module.css";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Card, Htag, Tag } from "@/components";
import { HhData } from "@/components/HhData/HhData";

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
                <Htag tag="h1">Вакансии – {page.category}</Htag>
                <Tag size="m" color="red">
                    hh.ru
                </Tag>
            </div>
            <HhData {...page.hh} />
        </div>
    );
};
