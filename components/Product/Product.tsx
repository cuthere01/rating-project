
import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { Htag } from '../Htag/Htag';
import { priceRu } from '@/helpers/helpers';
import { Divider } from '../Divider/Divider';
import { P } from '../P/P';

export const Product = ({
    className,
    product,
    ...props
}: ProductProps): JSX.Element => {
    return (
        <Card className={styles.product}>
            <div className={styles.logo}>
                <img src={product.image} alt={product.title} />
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
                <Rating
                    rating={product.reviewAvg ?? product.initialRating}
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
                {product.reviewCount} отзывов
            </div>
            <div className={styles.hr}>
                <Divider className={styles.hr} />
            </div>
            <P size="m" className={styles.description}>
                {product.description}
            </P>
            <div className={styles.feature}>фичи</div>
            <div className={styles.advBlock}>
                {product.advantages && (
                    <div className={styles.advantages}>
                        <span></span>
                        <div>
                            <div className={styles.advTitle}>Преимущества</div>
                            <P size="m">{product.advantages}</P>
                        </div>
                    </div>
                )}
                {product.disadvantages && (
                    <div className={styles.disadvantages}>
                        <span></span>
                        <div>
                            <div className={styles.advTitle}>Недостатки</div>
                            <P size="m">{product.disadvantages}</P>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.hr}>
                <Divider className={styles.hr} />
            </div>
            <div className={styles.actions}>
                <Button appearance="primary">Узнать подробнее</Button>
                <Button appearance="ghost" arrow="right">
                    Читать отзывы
                </Button>
            </div>
        </Card>
    );
};
