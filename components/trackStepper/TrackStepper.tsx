"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
interface StepperProps {
  data: {
    title: string;
    icon: string;
  }[];
}
const TrackStepper: FC<StepperProps> = ({ data }) => {
  const [activeSteps, setActiveSteps] = useState<number[]>([0]);

  return (
    <div>
      <ol className="flex items-center justify-center  w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white  dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse rounded-xl">
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className="flex flex-col items-start gap-4 text-blue-600 dark:text-blue-500  "
            >
              <div className="flex items-center">
                <div className="flex  items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-[40px] h-[40px] me-2 text-xs ${
                      activeSteps.includes(index) ? "bg-tertiary" : "bg-gray3"
                    } rounded-full shrink-0 `}
                  >
                    <Image
                      src={`/icons/trackIcons/${item.icon}${
                        activeSteps.includes(index) ? "White" : ""
                      }.svg`}
                      alt="Step icon"
                      width={24}
                      height={24}
                    />
                  </span>
                  <p
                    className={`${
                      activeSteps.includes(index) ? "text-black" : "text-gray4"
                    } font-semibold`}
                  >
                    {item.title}
                  </p>
                  {index !== data.length - 1 && (
                    <div>
                      {activeSteps.includes(index) && (
                        <Image
                          src={"/icons/trackIcons/arrowOrange.svg"}
                          alt="arrow"
                          width={30}
                          height={0}
                          className="mx-4 relative "
                        />
                      )}
                      {!activeSteps.includes(index) && (
                        <Image
                          src={"/icons/trackIcons/arrowGray.svg"}
                          alt="arrow"
                          width={30}
                          height={0}
                          className="mx-4 relative "
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TrackStepper;
