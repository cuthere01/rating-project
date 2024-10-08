import { SidebarProps } from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import { Menu } from "../Menu/Menu";
import Logo from "@/layout/cuthere-react-logo.svg";
import classNames from "classnames";
import { Search } from "@/components";

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    return (
        <div className={classNames(className, styles.sidebar)} {...props}>
            <Logo className={styles.logo} />
            <Search />
            <Menu />
        </div>
    );
};
