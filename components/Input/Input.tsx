import { ForwardedRef, forwardRef } from 'react';
import styles from "./Input.module.css";
import { InputProps } from "./Input.props";
import classNames from "classnames";

export const Input = forwardRef(({ className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return <input className={classNames(className, styles.input)} ref={ref} {...props} />;
});
