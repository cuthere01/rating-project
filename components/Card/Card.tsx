import classnames from "classnames";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";

export const Card = ({
    color = "white",
    children,
    className,
    ...props
}: CardProps): JSX.Element => {
    return (
        <div
            className={classnames(styles.card, className, {
                [styles.primary]: color == "primary",
            })}
            {...props}
        >
            {children}
        </div>
    );
};
