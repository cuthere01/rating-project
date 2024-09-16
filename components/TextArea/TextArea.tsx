import styles from "./TextArea.module.css";
import { TextAreaProps } from "./TextArea.props";
import classNames from "classnames";

export const TextArea = ({
    className,
    ...props
}: TextAreaProps): JSX.Element => {
    return (
        <textarea
            className={classNames(className, styles.textArea)}
            {...props}
        />
    );
};
