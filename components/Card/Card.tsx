import classnames from "classnames";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(({
    color = "white",
    children,
    className,
    ...props
}: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
        <div
            className={classnames(styles.card, className, {
                [styles.primary]: color == "primary",
            })}
            {...props}
        >
            <div className={styles.anchor} ref={ref}></div>
            {children}
        </div>
    );
});
