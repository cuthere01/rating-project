import classnames from "classnames";
import styles from "./Up.module.css";
import { UpProps } from "./Up.props";
import UpIcon from './up.svg';
import { useScrollY } from '@/hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const Up = (): JSX.Element => {
    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        const height = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.body.clientHeight,
        );
        const opacity = (y / height) * 2 < 1 ? y / height : 1;

        controls.start({ opacity: opacity });

    }, [y, controls]);

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.button
            className={styles.up}
            onClick={scrollToTop}
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <UpIcon />
        </motion.button>
    );
};
