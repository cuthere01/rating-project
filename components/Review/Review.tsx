import classNames from "classnames";
import styles from "./Review.module.css";
import { ReviewProps } from "./Review.props";
import UserIcon from './user.svg';
import { P } from '../P/P';
import { format } from 'date-fns';
import { ru } from "date-fns/locale";
import { Rating } from '../Rating/Rating';

export const Review = ({
    review,
    className,
    ...props
}: ReviewProps): JSX.Element => {
    const {name, title, description, createdAt, rating} = review;

    return (
        <div className={classNames(styles.review, className)} {...props}>
            <UserIcon />
            <div className={styles.title}>
                <P size="s">
                    <b>{name}:</b>
                </P>
                <P size="s">{title}</P>
            </div>
            <div className={styles.date}>
                {createdAt && format(new Date(createdAt), "dd MMMM yyyy")}
            </div>
            <Rating isEditable={false} rating={rating} />
            <P size="s" className={styles.description}>
                {description}
            </P>
        </div>
    );
};
