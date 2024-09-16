import classNames from "classnames";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useState } from "react";
import SearchIcon from "./search.svg";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>("");
    return (
        <div className={classNames(className, styles.search)}>
            <Input
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button
                appearance="primary"
                className={styles.button}
                onClick={() => {}}
            >
                <SearchIcon />
            </Button>
        </div>
    );
};
