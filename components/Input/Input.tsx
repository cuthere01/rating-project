import { ForwardedRef, forwardRef } from 'react';
import styles from "./Input.module.css";
import { InputProps } from "./Input.props";
import classNames from "classnames";

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={classNames(className, styles.inputWrapper)}>
            <input
                className={classNames(styles.input, {
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
