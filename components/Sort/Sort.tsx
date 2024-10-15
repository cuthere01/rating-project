import classNames from "classnames";
import styles from "./Sort.module.css";
import { SortEnum, SortProps } from "./Sort.props";
import SortIcon from "./sort.svg";

export const Sort = ({
    sort,
    setSort,
    className,
    ...props
}: SortProps): JSX.Element => {
    const sortOptions = [
        { label: "По умолчанию", value: SortEnum.Initial },
        { label: "По рейтингу", value: SortEnum.Rating },
        { label: "По цене", value: SortEnum.Price },
    ];

    return (
        <div className={classNames(styles.sort, className)} {...props}>
            <div className={styles.sortName} id="sort">
                сортировка
            </div>
            {sortOptions.map(({ label, value }) => (
                <button
                    key={value}
                    id={"value" + value.toString()}
                    onClick={() => setSort(value)}
                    className={classNames({
                        [styles.active]: sort === value,
                    })}
                    aria-selected={sort === value}
                    aria-labelledby={"sort " + "value" + value.toString()}
                >
                    <SortIcon className={styles.icon} />
                    {label}
                </button>
            ))}
        </div>
    );
};
