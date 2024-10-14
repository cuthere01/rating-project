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
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '@/helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
    productId,
    className,
    isOpened,
    ...props
}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm): Promise<void> => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(
                API.review.createDemo,
                { ...formData, productId }
            );
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError("Что-то пошло не так");
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className={classNames(styles.reviewForm, className)}
                {...props}
            >
                <Input
                    {...register("name", {
                        required: { value: true, message: "Заполните имя" },
                    })}
                    placeholder="Имя"
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                />
                <Input
                    {...register("title", {
                        required: {
                            value: true,
                            message: "Заполните заголовок",
                        },
                    })}
                    placeholder="Заголовок отзыва"
                    className={styles.title}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                />
                <div className={styles.rating}>
                    <P size="s">Оценка:</P>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{
                            required: {
                                value: true,
                                message: "Поставьте оценку",
                            },
                        }}
                        render={({ field }) => (
                            <Rating
                                rating={Number(field.value)}
                                ref={field.ref}
                                setRating={field.onChange}
                                isEditable={true}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>
                <TextArea
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Заполните текст отзыва",
                        },
                    })}
                    placeholder="Текст отзыва"
                    className={styles.description}
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                />
                <div className={styles.submit}>
                    <Button appearance="primary" tabIndex={isOpened ? 0 : -1}>
                        Отправить
                    </Button>
                    <P size="s" className={styles.info}>
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </P>
                </div>
            </div>
            {isSuccess && (
                <div className={classNames(styles.success, styles.panel)}>
                    <P size="s" className={styles.successTitle}>
                        <b> Ваш отзыв отправлен</b>
                    </P>
                    <P size="s">
                        Спасибо, ваш отзыв будет опубликован после проверки
                    </P>
                    <CloseIcon
                        className={styles.close}
                        onClick={() => setIsSuccess(false)}
                    />
                </div>
            )}
            {error && (
                <div className={classNames(styles.error, styles.panel)}>
                    <P size="s">
                        <b>Ошибка</b>
                    </P>
                    <P size="s">{error}</P>
                    <CloseIcon
                        className={styles.close}
                        onClick={() => setError(undefined)}
                    />
                </div>
            )}
        </form>
    );
};
