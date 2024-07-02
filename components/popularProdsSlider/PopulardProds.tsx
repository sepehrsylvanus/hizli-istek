"use client";

import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./popularProds.module.css";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { popularProds } from "@/constants/mainPage";
const PopulardProds = () => {
  return (
    <section className="px-7">
      <p className=" font-semibold text-xl">Popular products</p>
      <div className="mt-6">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className={styles.swiper}
          slidesPerView={4}
          spaceBetween={30}
        >
          {popularProds.map((popularProd, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div className="border border-textColor rounded-lg relative flex flex-col items-center px-[5em] pt-6 pb-8">
                <div className=" absolute top-2 left-4 h-[24px] w-[52px]">
                  <Image
                    src={popularProd.store}
                    alt={popularProd.storeTitle}
                    fill
                  />
                </div>
                <Image
                  src={popularProd.prodImg}
                  alt={popularProd.title}
                  width={140}
                  height={100}
                />
                <p>{popularProd.title}</p>
                <p>{popularProd.price}$</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopulardProds;
