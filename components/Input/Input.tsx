import styles from "./Input.module.css";
import { InputProps } from "./Input.props";
import classNames from "classnames";

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
    return <input className={classNames(className, styles.input)} {...props} />;
};
