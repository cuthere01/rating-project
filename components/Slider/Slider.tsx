import { SliderProps, PageWithCategory } from "./Slider.props";
import styles from "./Slider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useState, ReactNode } from "react";
import { P } from '../P/P';

export const Slider = ({
    className,
    mainNav,
    menuNav,
    type,
    page,
}: SliderProps): JSX.Element => {
    const [randomPages, setRandomPages] = useState<PageWithCategory[]>([]);

    useEffect(() => {
        if (menuNav) {
            const pages: PageWithCategory[] = menuNav
                .flatMap((m) =>
                    m.pages.map((p) => ({
                        ...p,
                        secondCategory: m._id.secondCategory,
                    }))
                )
                .sort(() => Math.random() - 0.5)
                .slice(0, 10);

            setRandomPages(pages);
        }
    }, [menuNav]);

    const renderSwiperSlides = (): ReactNode => {
        if (type === "firstLvl" && mainNav) {
            return mainNav.map((m, i) => (
                <SwiperSlide key={i}>
                    <Link href={`/${m.route}`} className={styles.slide}>
                        <h2 className={styles.title}>{m.name}</h2>
                        {m.icon}
                    </Link>
                </SwiperSlide>
            ));
        }

        if (type === "secondLvl" && randomPages.length > 0) {
            return randomPages.map((p, j) => (
                <SwiperSlide key={j}>
                    <Link
                        href={`${page && page.route}/${p.alias}`}
                        className={styles.slide}
                    >
                        <h2 className={styles.titleSm}>{p.category}</h2>
                        <p>{p.secondCategory}</p>
                    </Link>
                </SwiperSlide>
            ));
        }

        return (
            <P size='l'>
                В настоящий момент отзывы в категории <span className={styles.lowerCase}>{page && page.name}</span> отсутствуют
            </P>
        );
    };

    return (
        <Swiper
            className={classNames(className, styles.swiper)}
            spaceBetween={10}
            slidesPerView={1}
            loop={randomPages.length > 1} // Условие для цикличности слайдера
            autoplay={{
                delay: 2500,
                disableOnInteraction: true,
            }}
            modules={[Pagination, Autoplay]}
            pagination={{
                clickable: true,
                bulletClass: styles.bullet,
                bulletActiveClass: styles.bulletActive,
            }}
            breakpoints={{
                1200: {
                    spaceBetween: 30,
                    slidesPerView: type === "secondLvl" ? 2 : 1,
                },
            }}
        >
            {renderSwiperSlides()}
        </Swiper>
    );
};
