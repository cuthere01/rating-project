import classNames from "classnames";
import styles from "./Review.module.css";
import { ReviewProps } from "./Review.props";

export const Review = ({
    review,
    className,
    ...props
}: ReviewProps): JSX.Element => {
    return (
        <div
            className={classNames(styles.card, className)}
            {...props}
        >
            
        </div>
    );
};
