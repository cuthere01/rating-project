import { ForwardedRef, forwardRef } from 'react';
import styles from "./TextArea.module.css";
import { TextAreaProps } from "./TextArea.props";
import classNames from "classnames";

export const TextArea = forwardRef(({
    className,
    error,
    ...props
}: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={classNames(className, styles.textAreaWrapper)}>
            <textarea
                className={classNames(styles.textArea, {
                    [styles.error]: error,
                })}
                ref={ref}
                {...props}
            />
            {error && (
                <span className={styles.errorMessage}>{error.message}</span>
            )}
        </div>
    );
});
