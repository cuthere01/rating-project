import classnames from "classnames";
import styles from "./P.module.css";
import { PProps } from "./P.props";

export const P = ({
    size = "m",
    children,
    className,
    ...props
}: PProps): JSX.Element => {
    return (
        <p className={classnames(styles.p, className, styles[size])} {...props}>
            {children}
        </p>
    );
};
