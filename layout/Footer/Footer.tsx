import classNames from "classnames";
import { FooterProps } from "./Footer.props";
import styles from "./Footer.module.css";
import { format } from "date-fns";

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    const currentDate = format(new Date(), "yyyy");
    return (
        <footer className={classNames(className, styles.footer)} {...props}>
            <p className={styles.text}>
                CuthereProject{" "}
                {currentDate === "2024" ? currentDate : `2024 – ${currentDate}`}
            </p>
            <div className={styles.extra}>
                <a href="#" className={styles.text}>
                    Пользовательское соглашение
                </a>
                <a href="#" className={styles.text}>
                    Политика конфиденциальности
                </a>
            </div>
        </footer>
    );
};
