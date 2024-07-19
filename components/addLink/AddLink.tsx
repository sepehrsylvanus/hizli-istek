"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { Input } from "../ui/Input";
import { FiMinus } from "react-icons/fi";
import Lottie from "lottie-react";
import orangeLoader from "@/public/orangeLoader.json";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { nextLeve } from "@/features/orderStepSlice";

const AddLink = () => {
  const [newLink, setNewLink] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="h-screen flex flex-col items-center justify-between ">
      <div className="eachOrder container w-full">
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
            <div className="relative bottom-3.5">
              <p className="text-4.5 font-semibold mb-3">Quantity</p>
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
        <div className="border border-primaryContainer rounded-2xl p-4 mt-4">
          <p>description:</p>
          <Input className="border-none outline-none" />
        </div>
        <Dialog>
          <DialogTrigger className="  rounded-2xl bg-transparent border border-gray2 hover:bg-transparent font-normal flex gap-2 items-center py-[1em] px-[1em] mt-4 text text-[24px]">
            <Image
              src={"/icons/addSquareOrange.svg"}
              alt="add"
              width={40}
              height={40}
            />
            Add more link
          </DialogTrigger>
          <DialogContent className="w-[31rem] h-[31rem] flex flex-col">
            <DialogHeader className="h-fit">
              <DialogTitle className="text-center">Add link</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-between h-full">
              <div className="w-full">
                <div className="flex gap-2 w-full">
                  <Input
                    type="text"
                    className="border border-gray2 rounded-2xl outline-none"
                  />
                  <Image
                    src={"/icons/resetLink.svg"}
                    alt="resetLink"
                    width={40}
                    height={40}
                  />
                </div>
                <Button className="  rounded-2xl bg-transparent hover:bg-transparent font-normal flex gap-2 items-center py-[1em]  mt-4 text text-[24px] px-0">
                  <Image
                    src={"/icons/addSquareOrange.svg"}
                    alt="add"
                    width={40}
                    height={40}
                  />
                  Add more link
                </Button>
              </div>
              <DialogClose asChild>
                <Button className="bg-tertiary hover:bg-tertiaryHover w-fit text-white font-normal text-[20px]  px-[4em] py-7 rounded-2xl">
                  Add
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Button
        className="bg-tertiary hover:bg-tertiaryHover w-fit text-white font-normal text-[20px]  px-[4em] py-8 rounded-2xl mb-[4em]"
        onClick={() => dispatch(nextLeve())}
      >
        Confirm link
      </Button>
    </div>
  );
};

export default AddLink;
