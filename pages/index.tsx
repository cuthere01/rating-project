import { Htag, Button, P, Tag, Rating } from "@/components";
import { Noto_Sans } from "next/font/google";
import { useState } from "react";

const font = Noto_Sans({ subsets: ["latin"] });

export default function Home(): JSX.Element {
    const [rating, setRating] = useState<number>(2);

    return (
        <div className={font.className}>
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
        </div>
    );
}
