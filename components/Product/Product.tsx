
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
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion.create(forwardRef(({
    product,
    className,
    ...props
}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollIntoView = (): void => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        reviewRef.current?.focus();
    };

    const variantsReview = {
        visible: {
            height: "auto",
            opacity: 1
        },
        hidden: {
            height: 0,
            opacity: 0
        },
    };

    return (
        <div className={className} ref={ref} {...props}>
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
                    <span>
                        <span className="visuallyHidden">цена</span>
                        {priceRu(product.price)}
                    </span>
                    {product.oldPrice && (
                        <Tag color="green" size="s" className={styles.oldPrice}>
                            <span className="visuallyHidden">скидка</span>
                            {priceRu(product.price - product.oldPrice)}
                        </Tag>
                    )}
                </div>
                <div className={styles.credit}>
                    <span>
                        <span className="visuallyHidden">кредит</span>
                        {priceRu(product.credit)}
                    </span>
                    <span className={styles.month}>/мес</span>
                </div>
                <div className={styles.rating}>
                    {/* нужно продумать сортировку по рейтингу с отзывов и
                изначальному рейтингу */}
                    <span className="visuallyHidden">
                        {"рейтинг " + product.initialRating}
                    </span>
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
                <div className={styles.priceTitle} area-hidden="true">
                    цена
                </div>
                <div className={styles.creditTitle} area-hidden="true">
                    кредит
                </div>
                <div className={styles.rateTitle}>
                    <a href="#ref" onClick={scrollIntoView}>
                        {product.reviewCount}{" "}
                        {declOfNum(product.reviewCount, [
                            "отзыв",
                            "отзыва",
                            "отзывов",
                        ])}
                    </a>
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
                        aria-expanded={isReviewOpened}
                    >
                        Читать отзывы
                    </Button>
                </div>
            </Card>
            <motion.div
                animate={isReviewOpened ? "visible" : "hidden"}
                variants={variantsReview}
                initial={"hidden"}
                className={styles.reviewsWrapper}
            >
                <Card
                    color="primary"
                    className={styles.reviews}
                    ref={reviewRef}
                    tabIndex={isReviewOpened ? 0 : -1}
                >
                    {product.reviews.map((r) => (
                        <div key={r._id}>
                            <Review review={r} />
                            <Divider />
                        </div>
                    ))}
                    <ReviewForm
                        productId={product._id}
                        isOpened={isReviewOpened}
                    />
                </Card>
            </motion.div>
        </div>
    );
}));
