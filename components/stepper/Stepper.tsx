"use client";
import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";
import React, { FC, useState } from "react";
interface StepperProps {
  data: {
    title: string;
    icon: string;
  }[];
  pages: React.ReactNode[];
}
const Stepper: FC<StepperProps> = ({ data, pages }) => {
  const [activeSteps, setActiveSteps] = useState<number[]>([0]);
  console.log(pages);
  return (
    <div className="h-full">
      <ol className="flex items-center justify-center  w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white  dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        {data.map((item, index) => {
          console.log(
            `/icons/${item.icon}${
              activeSteps.includes(index) ? "White" : undefined
            }.svg`
          );

          return (
            <li
              key={index}
              className="flex flex-col items-start gap-4 text-blue-600 dark:text-blue-500  "
            >
              <div className="flex items-center">
                <div className="flex flex-col items-center gap-4">
                  <span
                    className={`flex items-center justify-center w-[64px] h-[64px] me-2 text-xs ${
                      activeSteps.includes(index) ? "bg-primary" : "bg-gray3"
                    } rounded-full shrink-0 `}
                  >
                    <Image
                      src={`/icons/${item.icon}${
                        activeSteps.includes(index) ? "White" : ""
                      }.svg`}
                      alt="Step icon"
                      width={40}
                      height={40}
                    />
                  </span>
                  <p
                    className={`${
                      activeSteps.includes(index + 1)
                        ? "text-primary"
                        : "text-gray4"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
                {index !== data.length - 1 && (
                  <div>
                    {activeSteps.includes(index + 1) && (
                      <Image
                        src={"/icons/arrowPrimary.svg"}
                        alt="arrow"
                        width={60}
                        height={0}
                        className="mx-[2.5em] relative bottom-4"
                      />
                    )}
                    {!activeSteps.includes(index + 1) && (
                      <Image
                        src={"/icons/arrowGray.svg"}
                        alt="arrow"
                        width={60}
                        height={0}
                        className="mx-[2.5em] relative bottom-4"
                      />
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {pages[activeSteps.length - 1]}
    </div>
  );
};

export default Stepper;
