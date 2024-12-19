"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/navigation";
import styles from "./popularProds.module.css";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import { popularProds } from "@/constants/mainPage";

const PopulardProds = () => {
  return (
    <section className=" pop  px-7 mt-[6em] ">
      <p className=" font-semibold text-xl pl-[.8em] ml-[1.8em]">
        Popular products
      </p>
      <div className="mt-6">
        <Swiper
          navigation={true}
          modules={[Scrollbar]}
          className={`${styles.swiper} `}
          slidesPerView={4.5}
          spaceBetween={15}
        >
          {popularProds.map((popularProd, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div className="border border-textColor rounded-lg relative flex flex-col items-center px-[5em] pt-6 pb-8 justify-center w-[300px]">
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
