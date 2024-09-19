import styles from "./Advantages.module.css";
import { AdvantagesProps } from "./Advantages.props";
import Check from "./check.svg";
import { Htag } from "../Htag/Htag";
import { P } from "../P/P";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
    return (
        <div className={styles.advantages}>
            <Htag tag="h2">Преимущества</Htag>
            {advantages.map((a) => (
                a.title && 
                <div key={a._id} className={styles.block}>
                    <div className={styles.title}>
                        <Check />
                        <Htag tag="h3">{a.title}</Htag>
                    </div>
                    <div className={styles.desc}>
                        <div className={styles.line}></div>
                        <P size="l">{a.description}</P>
                    </div>
                </div>
            ))}
        </div>
    );
};
