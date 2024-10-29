import { withLayout } from "@/layout/Layout";
import { GetStaticProps } from "next";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.interface";
import { API } from '@/helpers/api';
import { firstLvlMenu } from '@/helpers/helpers';
import { Htag, P, Slider } from '@/components';
import styles from './index.module.css';

function Home(): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <Htag tag="h1" className={styles.name}>Rating Project</Htag>
            <P size="l" className={styles.desc}>База отзывов на все случаи жизни</P>
            <div>
                <Slider mainNav={firstLvlMenu} type="firstLvl" />
            </div>
        </div>
    );
}

export default withLayout(Home);

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

interface HomeProps extends Record<string, unknown> {
    menu?: MenuItem[];
    firstCategory?: number;
}
