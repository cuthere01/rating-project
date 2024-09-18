import classNames from "classnames";
import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";
import { Input } from '../Input/Input';
import { P } from '../P/P';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';

export const ReviewForm = ({
    prodoctId,
    className,
    ...props
}: ReviewFormProps): JSX.Element => {

    return (
        <>
            <div
                className={classNames(styles.reviewForm, className)}
                {...props}
            >
                <Input placeholder="Имя" />
                <Input
                    placeholder="Заголовок отзыва"
                    className={styles.title}
                />
                <div className={styles.rating}>
                    <P size="s">Оценка:</P>
                    <Rating rating={0} isEditable={true} />
                </div>
                <TextArea
                    placeholder="Текст отзыва"
                    className={styles.description}
                />
                <div className={styles.submit}>
                    <Button appearance="primary">Отправить</Button>
                    <P size="s" className={styles.info}>
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </P>
                </div>
            </div>
            <div className={classNames(styles.success, styles.panel)}>
                <P size="s" className={styles.successTitle}>
                    Ваш отзыв отправлен
                </P>
                <P size="s">
                    Спасибо, ваш отзыв будет опубликован после проверки
                </P>
                <CloseIcon className={styles.close} />
            </div>
        </>
    );
};
