import styles from "./ButtonIcon.module.css";
import { ButtonIconProps, icons } from "./ButtonIcon.props";
import classnames from "classnames";

export const ButtonIcon = ({
    appearance,
    icon,
    className,
    ...props
}: ButtonIconProps): JSX.Element => {
    const IconComponent = icons[icon];

    return (
        <button
            className={classnames(styles.button, className, {
                [styles.primary]: appearance === "primary",
                [styles.white]: appearance === "white",
            })}
            {...props}
        >
            <IconComponent />
        </button>
    );
};
