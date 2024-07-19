"use client";
import React, { useRef, useState } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./slider.module.css";
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css";

import Image from "next/image";
import { discountSlides } from "@/constants/mainPage";

const SliderSec = () => {
  return (
    <section className="slider  mt-[12em] px-[4.5em] ">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          waitForTransition: true,
          pauseOnMouseEnter: true,
        }}
        modules={[Pagination, Autoplay]}
        className={styles.swiper}
      >
        {discountSlides.map((discountSlide, index) => (
          <SwiperSlide
            key={index}
            className={` relative ${styles.swiperSlide} `}
          >
            <div className="h-[256px] w-full  relative 2xl:container">
              <Image
                src={discountSlide.image}
                alt="slider"
                fill
                className=" opacity-50 absolute object-fill" // or object-contain, object-fill
              />
              <p className=" absolute top-8 right-8 font-bold text-4xl z-20">
                {`%${discountSlide.discount}`}
              </p>
              <div className=" w-[153px] h-[64px] absolute bottom-8 left-8">
                <Image src={discountSlide.brandImg} alt="zara" fill />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SliderSec;
