import styles from "./Rating.module.css";
import { RatingProps } from "./Rating.props";
import { useEffect, useState, KeyboardEvent } from "react";
import StarIcon from "./star.svg";
import classNames from "classnames";
import { nanoid, random } from "nanoid";

export const Rating = ({
    isEditable = false,
    rating,
    setRating,
    ...props
}: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
        new Array(5).fill(<></>)
    );

    const changeDisplay = (i: number): void => {
        if (!isEditable) {
            return;
        }
        constructRating(i);
    };

    const onClick = (i: number): void => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleSpace = (
        e: KeyboardEvent<HTMLSpanElement>,
        i: number
    ): void => {
        if (e.code !== "Space" || !setRating) {
            return;
        }
        setRating(i);
    };

    const constructRating = (currentRating: number): void => {
        const updArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span
                    key={i}
                    className={classNames(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                >
                    <StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) =>
                            isEditable && handleSpace(e, i + 1)
                        }
                    />
                </span>
            );
        });
        setRatingArray(updArray);
    };

    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    return (
        <div className={styles.rating} {...props} >
            {ratingArray}
        </div>
    );
};
