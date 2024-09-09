import { HeaderProps } from "./Header.props";
import styles from "./Sidebar.module.css";

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
    console.log("header");
    return <div {...props}>Header</div>;
};
