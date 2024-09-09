import { Htag, Button, P, Tag, Rating } from "@/components";
import { withLayout } from "@/layout/Layout";
import { useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.interface";

function Home({ menu }: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(2);

    return (
        <>
            <Htag tag="h1">Текст</Htag>
            <Htag tag="h2">Текст</Htag>
            <Htag tag="h3">Текст</Htag>
            <P>Текст</P>
            <P size="l">Текст</P>
            <P size="m">Текст</P>
            <P size="s">Текст</P>
            <Button appearance="primary">Кнопка</Button>
            <Button appearance="primary" arrow="right">
                Кнопка
            </Button>
            <Button appearance="ghost" arrow="down">
                Кнопка
            </Button>
            <Tag>Метка</Tag>
            <Tag size="s" color="ghost">
                Метка
            </Tag>
            <Tag size="s" color="red">
                Метка
            </Tag>
            <Tag size="s" color="primary">
                Метка
            </Tag>
            <Tag size="m" color="green">
                Метка
            </Tag>
            <Tag size="m" color="gray">
                Метка
            </Tag>
            <Rating isEditable={false} rating={3}></Rating>
            <Rating
                isEditable={true}
                rating={rating}
                setRating={setRating}
            ></Rating>
            <ul>
                {menu.map((m) => (
                    <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
                ))}
            </ul>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
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
    menu: MenuItem[];
    firstCategory: number;
}
