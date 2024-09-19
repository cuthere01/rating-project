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

const Type = ({ firstCategory, menu }: TypeProps): JSX.Element => {
    const router = useRouter();
    const { setMenu } = useContext(AppContext);

    // Используем useEffect для обновления меню при изменении роута
    useEffect(() => {
        if (setMenu) {
            setMenu(menu);
        }
    }, [router.asPath]);

    return <div>Type: {firstCategory}</div>;
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLvlMenu.map((m) => `/${m.route}`),
        fallback: true,
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
