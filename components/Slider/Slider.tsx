import { SliderProps } from "./Slider.props";
import styles from './Slider.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Htag } from '../Htag/Htag';
import Link from 'next/link';
import classNames from 'classnames';

export const Slider = ({ className, mainNav }: SliderProps): JSX.Element => {

    return (
        <Swiper
            className={classNames(className, styles.swiper)}
            spaceBetween={50}
            slidesPerView={1}
            // onSlideChange={(swiper) => {
                
            // }}
            modules={[Pagination]}
            pagination={{
                clickable: true,
                //el: `.${styles.pagination}`,
                bulletClass: styles.bullet,
                bulletActiveClass: styles.bulletActive,
            }}
        >
            {mainNav?.map((m, i) => (
                <SwiperSlide key={i}>
                    <Link href={`/${m.route}`} className={styles.slide}>
                        <Htag tag="h2" className={styles.title}>
                            {m.name}
                        </Htag>
                        {m.icon}
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
