"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/Button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { Input } from "../ui/Input";
import { FiMinus } from "react-icons/fi";
import Lottie from "lottie-react";
import orangeLoader from "@/public/orangeLoader.json";
const AddLink = () => {
  return (
    <div className="h-full">
      <div className="eachOrder px-[5em]">
        <div className="orderDetail relative w-full bg-gray2 rounded-lg h-[16.5rem]  flex items-center justify-around">
          <Image
            src={"/amazon.svg"}
            alt="store logo"
            width={64}
            height={64}
            className=" absolute top-2 left-2 "
          />

          <Button
            variant="outline"
            size="icon"
            className="bg-transparent border-none absolute top-4 right-4"
          >
            <IoMdCloseCircleOutline className="w-10 h-10" />
          </Button>

          <div className="orderDetails flex justify-around items-center w-full">
            <div className="py-[3em] px-[5em] bg-onColor rounded-lg">
              <Image
                src={"/product.svg"}
                alt="product"
                width={77}
                height={70}
              />
            </div>
            <div className=" w-[20em] h-7 flex items-center">
              <Lottie animationData={orangeLoader} loop={true} />
            </div>
            <div>
              <p className="text-4.5 font-semibold mb-3">Pieces</p>
              <div className="flex gap-2.5">
                <Button size="icon" className=" bg-tertiary rounded-xl">
                  <GoPlus className="text-white text-[20px]" />
                </Button>
                <Input
                  value="1"
                  className=" w-[6.5em] rounded-xl border border-tertiary text-center"
                />
                <Button size="icon" className=" bg-tertiary rounded-xl">
                  <FiMinus className="text-white text-[20px]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-primaryContainer rounded-lg p-4 mt-4">
          <p>description:</p>
          <Input className="border-none outline-none" />
        </div>
      </div>
    </div>
  );
};

export default AddLink;
