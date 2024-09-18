import classNames from "classnames";
import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";
import { Input } from '../Input/Input';
import { P } from '../P/P';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';

export const ReviewForm = ({
    productId,
    className,
    ...props
}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit } = useForm<IReviewForm>();

    const onSubmit = (data: IReviewForm): void => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className={classNames(styles.reviewForm, className)}
                {...props}
            >
                <Input {...register("name")} placeholder="Имя" />
                <Input
                    {...register("title")}
                    placeholder="Заголовок отзыва"
                    className={styles.title}
                />
                <div className={styles.rating}>
                    <P size="s">Оценка:</P>
                    <Controller
                        control={control}
                        name="rating"
                        render={({ field }) => (
                            <Rating rating={Number(field.value)} ref={field.ref} setRating={field.onChange} isEditable={true} />
                        )}
                    />
                </div>
                <TextArea
                    {...register("description")}
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
        </form>
    );
};
