import classnames from "classnames";
import styles from "./HhData.module.css";
import { HhDataProps } from "./HhData.props";
import { Card } from "../Card/Card";

export const HhData = ({ count }: HhDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            <Card className={styles.count}>
                <span className={styles.hhStatTitle}>Всего вакансий</span>
                <span className={styles.hhStatCount}>{count}</span>
            </Card>
        </div>
    );
};
