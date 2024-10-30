import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from 'react';
import { themes } from '@/helpers/helpers';

export type ThemeKey = keyof typeof themes;

export interface IThemeContext {
    theme: ThemeKey;
    setTheme?: (newTheme: ThemeKey) => void;
}

const ThemeContext = createContext<IThemeContext>({
	theme: "default"
});

export const ThemeContextProvider = ({ children }: PropsWithChildren<IThemeContext>): ReactNode => {
	const [themeState, setThemeState] = useState<ThemeKey>(() => {
		if (typeof window !== "undefined") {
			return (localStorage.getItem("theme") as ThemeKey) || "default";
		}
		return "default";
	});

	const setTheme = (newTheme: ThemeKey): void => {
        setThemeState(newTheme);
		localStorage.setItem("theme", newTheme);
    };

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as ThemeKey;
		if (storedTheme) setThemeState(storedTheme);
	}, []);

	console.log(themeState);

	return (
		<ThemeContext.Provider value={{theme: themeState, setTheme}}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): IThemeContext => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};


