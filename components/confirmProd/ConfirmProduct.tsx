"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/Button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { Input } from "../ui/Input";
import { FiMinus } from "react-icons/fi";
import styles from "./ConfirmProd.module.css";
const ConfirmProd = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between ">
      <div className="eachOrder px-[5em] w-full">
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

          <div className="orderDetails grid grid-cols-4 gap-[5em] justify-around items-center w-full px-[7em]">
            <div className="py-[3em] px-[5em] bg-onColor rounded-lg col-span-1">
              <Image
                src={"/product.svg"}
                alt="product"
                width={77}
                height={70}
              />
            </div>
            <div className=" flex flex-col items-start col-span-2">
              <p className="text-[18px] flex gap-4">
                {`BULLIANT Men's Belt Ratchet Leather Belt`}

                <Image
                  src={"/icons/info.svg"}
                  alt="info"
                  width={40}
                  height={40}
                />
              </p>

              <ul className={`${styles.customList} ml-4`}>
                <li> Suit Business</li>
                <li>Automatic Buckle for Men</li>
                <li>Size Adjustable</li>
                <li>Clothing Width 35 mm</li>
              </ul>
            </div>
            <div className="relative bottom-3.5 col-span-1 flex flex-col gap-6">
              <div>
                <p className="text-4.5 font-semibold mb-3">Quantity</p>
                <div className="flex gap-2.5">
                  <Button
                    disabled
                    size="icon"
                    className=" bg-tertiary rounded-xl"
                  >
                    <GoPlus className="text-white text-[20px]" />
                  </Button>
                  <Input
                    disabled
                    value="1"
                    className=" w-[6.5em] rounded-xl border border-tertiary text-center"
                  />
                  <Button
                    disabled
                    size="icon"
                    className=" bg-tertiary rounded-xl"
                  >
                    <FiMinus className="text-white text-[20px]" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-[18px] font-[500]">Price:</p>
                <p className="w-[188px] h-[55px] text-[20px] bg-white flex justify-center items-center rounded-xl">
                  21.99 $
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-primaryContainer rounded-2xl p-4 mt-4">
          <p>Admin description:</p>
          <Input className="border-none outline-none" />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <p className="text-[20px] font-[500] text-center">
          Do you confrim your order?
        </p>
        <div className="flex gap-9">
          <Button className="bg-tertiary hover:bg-tertiaryHover w-fit text-white font-normal text-[20px]  px-[4em] py-8 rounded-2xl">
            Confirm link
          </Button>
          <Button className=" w-fit text-textColor border border-gray4 bg-transparent font-normal hover:bg-transparent text-[20px]  px-[4em] py-8 rounded-2xl hover:border-tertiaryHover hover:text-tertiaryHover">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmProd;
