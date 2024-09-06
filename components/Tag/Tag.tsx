import classnames from "classnames";
import styles from "./Tag.module.css";
import { TagProps } from "./Tag.props";

export const Tag = ({
    size = "s",
    color = "ghost",
    children,
    className,
    ...props
}: TagProps): JSX.Element => {
    return (
        <div
            className={classnames(
                styles.tag,
                className,
                styles[size],
                styles[color]
            )}
            {...props}
        >
            {children}
        </div>
    );
};
