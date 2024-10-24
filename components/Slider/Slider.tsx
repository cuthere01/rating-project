import { SliderProps } from "./Slider.props";
import styles from './Slider.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import classNames from 'classnames';

export const Slider = ({ className, mainNav }: SliderProps): JSX.Element => {

    return (
        <Swiper
            className={classNames(className, styles.swiper)}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
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
        >
            {mainNav?.map((m, i) => (
                <SwiperSlide key={i}>
                    <Link href={`/${m.route}`} className={styles.slide}>
                        <h2 className={styles.title}>{m.name}</h2>
                        {m.icon}
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
