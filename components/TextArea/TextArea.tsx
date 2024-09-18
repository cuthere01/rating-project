import { ForwardedRef, forwardRef } from 'react';
import styles from "./TextArea.module.css";
import { TextAreaProps } from "./TextArea.props";
import classNames from "classnames";

export const TextArea = forwardRef(({
    className,
    ...props
}: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <textarea
            className={classNames(className, styles.textArea)}
            ref={ref}
            {...props}
        />
    );
});
