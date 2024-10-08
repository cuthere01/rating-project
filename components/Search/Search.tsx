import classNames from "classnames";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useState } from "react";
import SearchIcon from "./search.svg";
import { useRouter } from 'next/router';
import { KeyboardEvent } from 'react';

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

    const handleKeyDown = (e: KeyboardEvent): void => {
        if(e.key == 'Enter'){
            goToSearch();
        }
    };

    return (
        <div className={classNames(className, styles.search)} {...props}>
            <Input
                className={styles.input}
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button
                appearance="primary"
                className={styles.button}
                onClick={goToSearch}
            >
                <SearchIcon />
            </Button>
        </div>
    );
};
