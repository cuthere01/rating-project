import classNames from "classnames";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useState } from "react";
import SearchIcon from "./search.svg";
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const goToSearch = (): void => {
        
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        goToSearch();
    };

    return (
        <form
            className={classNames(className, styles.search)}
            onSubmit={handleSubmit}
            {...props}
            role="search"
        >
            <Input
                className={styles.input}
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button
                appearance="primary"
                className={styles.button}
                type="submit"
                aria-label="Искать по сайту"
            >
                <SearchIcon />
            </Button>
        </form>
    );
};
