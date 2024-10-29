import { withLayout } from "@/layout/Layout";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.interface";
import { firstLvlMenu } from "@/helpers/helpers";
import { ParsedUrlQuery } from "node:querystring";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/app.context";
import { API } from '@/helpers/api';
import { Htag, P, Slider } from '@/components';
import styles from './type.module.css';

const Type = ({ firstCategory, menu }: TypeProps): JSX.Element => {
    const router = useRouter();
    const { setMenu } = useContext(AppContext);

    useEffect(() => {
        if (setMenu) {
            setMenu(menu);
        }
    }, [router.asPath]);

    console.log(firstLvlMenu[firstCategory]);
    return (
        <>
            <Htag tag="h1" className={styles.name}>
                {firstLvlMenu[firstCategory].name}
            </Htag>
            <P size="l" className={styles.desc}>
                {firstLvlMenu[firstCategory].desc}
            </P>
            <Slider
                menuNav={menu}
                type="secondLvl"
                page={firstLvlMenu[firstCategory]}
            />
        </>
    );
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    const isDev = process.env.NEXT_PUBLIC_IS_DEV === "true";

    return {
        paths: firstLvlMenu.map((m) => `/${m.route}`),
        fallback: isDev ? true : false,
        // fallback: true,
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
    params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    const firstCategoryItem = firstLvlMenu.find((m) => m.route == params.type);
    if (!firstCategoryItem) {
        return {
            notFound: true,
        };
    }
    const { data: menu } = await axios.post<MenuItem[]>(
        API.topPage.find,
        { firstCategory: firstCategoryItem.id }
    );
    if (!menu) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id,
        },
    };
};

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
