import { withLayout } from "@/layout/Layout";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.interface";
import { firstLvlMenu } from "@/helpers/helpers";
import { ParsedUrlQuery } from "node:querystring";

const Type = ({ firstCategory }: TypeProps): JSX.Element => {
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
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
        { firstCategory: firstCategoryItem.id }
    );
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