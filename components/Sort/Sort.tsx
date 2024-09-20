import classnames from "classnames";
import styles from "./Sort.module.css";
import { SortEnum, SortProps } from "./Sort.props";
import SortIcon from "./sort.svg";

export const Sort = ({
    sort,
    setSort,
    className,
    ...props
}: SortProps): JSX.Element => {
    return (
        <div className={classnames(styles.sort, className)} {...props}>
            <span
                onClick={() => setSort(SortEnum.Initial)}
                className={classnames({
                    [styles.active]: sort == SortEnum.Initial,
                })}
            >
                <SortIcon className={styles.icon} />
                По умолчанию
            </span>
            <span
                onClick={() => setSort(SortEnum.Rating)}
                className={classnames({
                    [styles.active]: sort == SortEnum.Rating,
                })}
            >
                <SortIcon className={styles.icon} />
                По рейтингу
            </span>
            <span
                onClick={() => setSort(SortEnum.Price)}
                className={classnames({
                    [styles.active]: sort == SortEnum.Price,
                })}
            >
                <SortIcon className={styles.icon} />
                По цене
            </span>
        </div>
    );
};
