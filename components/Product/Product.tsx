
import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { Htag } from '../Htag/Htag';
import { declOfNum, priceRu } from '@/helpers/helpers';
import { Divider } from '../Divider/Divider';
import { P } from '../P/P';
import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

export const Product = ({
    className,
    product,
    ...props
}: ProductProps): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

    return (
        <div>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>
                <Htag tag="h3" className={styles.title}>
                    {product.title}
                </Htag>
                <div className={styles.price}>
                    {priceRu(product.price)}
                    {product.oldPrice && (
                        <Tag color="green" size="s" className={styles.oldPrice}>
                            {priceRu(product.price - product.oldPrice)}
                        </Tag>
                    )}
                </div>
                <div className={styles.credit}>
                    {priceRu(product.credit)}
                    <span className={styles.month}>/мес</span>
                </div>
                <div className={styles.rating}>
                    {/* нужно продумать сортировку по рейтингу с отзывов и
                изначальному рейтингу */}
                    <Rating
                        // rating={product.reviewAvg ?? product.initialRating}
                        rating={product.initialRating}
                        isEditable={false}
                    />
                </div>
                <div className={styles.tags}>
                    {product.categories.map((c) => (
                        <Tag key={c} color="ghost">
                            {c}
                        </Tag>
                    ))}
                </div>
                <div className={styles.priceTitle}>цена</div>
                <div className={styles.creditTitle}>кредит</div>
                <div className={styles.rateTitle}>
                    {product.reviewCount}{" "}
                    {declOfNum(product.reviewCount, [
                        "отзыв",
                        "отзыва",
                        "отзывов",
                    ])}
                </div>
                <Divider className={styles.hr} />
                <P size="m" className={styles.description}>
                    {product.description}
                </P>
                <div className={styles.feature}>
                    {product.characteristics.map((c) => (
                        <div className={styles.char} key={c.name}>
                            <span className={styles.charName}>{c.name}</span>
                            <span className={styles.charDots}></span>
                            <span className={styles.charValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && (
                        <div className={styles.advantages}>
                            <span></span>
                            <div>
                                <div className={styles.advTitle}>
                                    Преимущества
                                </div>
                                <P size="m">{product.advantages}</P>
                            </div>
                        </div>
                    )}
                    {product.disadvantages && (
                        <div className={styles.disadvantages}>
                            <span></span>
                            <div>
                                <div className={styles.advTitle}>
                                    Недостатки
                                </div>
                                <P size="m">{product.disadvantages}</P>
                            </div>
                        </div>
                    )}
                </div>
                <Divider className={classNames(styles.hr, styles.hr2)} />
                <div className={styles.actions}>
                    <Button appearance="primary">Узнать подробнее</Button>
                    <Button
                        appearance="ghost"
                        arrow={isReviewOpened ? "down" : "right"}
                        onClick={() => setIsReviewOpened((prev) => !prev)}
                    >
                        Читать отзывы
                    </Button>
                </div>
            </Card>
            <Card
                color="primary"
                className={classNames(styles.review, {
                    [styles.opened]: isReviewOpened,
                    [styles.closed]: !isReviewOpened,
                })}
            >
                {product.reviews.map((r) => (
                    <>
                        <Review key={r._id} review={r} />
                        <Divider/>
                    </>
                ))}
                <ReviewForm prodoctId={product._id}/>
            </Card>
        </div>
    );
};
