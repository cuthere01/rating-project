
import classNames from 'classnames';
import styles from "./Divider.module.css";
import { DividerProps } from "./Divider.props";

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
    return (
        <hr className={classNames(className, styles.hr)} {...props}/>
    );
};
