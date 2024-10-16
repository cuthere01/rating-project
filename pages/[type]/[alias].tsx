import { withLayout } from "@/layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "@/interfaces/products.interface";
import { firstLvlMenu } from "@/helpers/helpers";
import { TopPageComponent } from "@/page-components";
import { API } from '@/helpers/api';
import Head from 'next/head';

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
    if (!page || !page.title) {
        return <div>Page not found</div>;
    }
    return (
        <>
            <Head>
                <title>{page.metaTitle}</title>
                <meta name="description" content={page.metaDescription} />
                <meta name="og:title" content={page.metaTitle} />
                <meta name="og:description" content={page.metaDescription} />
                <meta name="og:url" content={page.metaDescription} />
                <meta name="og:type" content="article" />
            </Head>
            <TopPageComponent
                firstCategory={firstCategory}
                page={page}
                products={products}
            />
        </>
    );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLvlMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: m.id,
        });
        paths = paths.concat(
            menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
        );
    }

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({
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

    try {
        const { data: menu } = await axios.post<MenuItem[]>(
            API.topPage.find,
            { firstCategory: firstCategoryItem.id }
        );
        if (menu.length == 0) {
            return {
                notFound: true,
            };
        }
        const { data: page } = await axios.get<TopPageModel>(
            API.topPage.byAlias + params.alias
        );
        if (!page || !page.title) {
            return {
                notFound: true,
            };
        }
        const { data: products } = await axios.post<ProductModel>(
            API.product.find,
            {
                category: page.category,
                limit: 10,
            }
        );

        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}
