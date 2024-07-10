"use client";

import React from "react";
import { Button } from "../ui/Button";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Address = () => {
  return (
    <div className="h-full flex flex-col items-center justify-between ">
      <div className="flex justify-around w-full">
        <div className="left">
          <p className="text-[18px] font-[500] text-textColor flex gap-3">
            <Image
              src={"/icons/circleOrange.svg"}
              alt="marker"
              width={12}
              height={12}
            />
            Choose the address on the map
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="right"></div>
      </div>

      <div className="flex flex-col gap-10">
        <Button className="bg-tertiary hover:bg-tertiaryHover w-fit text-white font-normal text-[20px]  px-[4em] py-8 rounded-2xl">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Address;
