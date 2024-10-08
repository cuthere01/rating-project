import { withLayout } from "@/layout/Layout";
import { GetStaticProps } from "next";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.interface";
import { API } from '@/helpers/api';

const Search = (): JSX.Element => {
    return <div>Поиск</div>;
};

export default withLayout(Search);

export const getStaticProps: GetStaticProps = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        API.topPage.find,
        { firstCategory }
    );
    return {
        props: {
            menu,
            firstCategory,
        },
    };
};

// interface HomeProps extends Record<string, unknown> {
//     menu: MenuItem[];
//     firstCategory: number;
// }
