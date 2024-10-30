import { useEffect } from "react";
import styles from "./ThemeSwitcher.module.css";
import { Button } from '../Button/Button';
import { useTheme } from '@/context/theme.context';
import { themes } from "@/helpers/helpers";

type ThemeKey = keyof typeof themes;


export const ThemeSwitcher = (): JSX.Element => {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        Object.values(themes).forEach((themeClass) => {
            if (themeClass) document.body.classList.remove(themeClass);
        });
        if (themes[theme]) document.body.classList.add(themes[theme]);
    }, [theme]);

    const switchTheme = (newTheme: ThemeKey): void => {
        if (setTheme) setTheme(newTheme);
    };

    return (
        <div className={styles.themeSwitcher}>
            {Object.keys(themes).map((themeKey) => (
                <Button
                    appearance='ghost'
                    key={themeKey}
                    onClick={() => switchTheme(themeKey as ThemeKey)}
                    className={styles.themeToggleButton}
                >
                    {themeKey}
                </Button>
            ))}
        </div>
    );
};
