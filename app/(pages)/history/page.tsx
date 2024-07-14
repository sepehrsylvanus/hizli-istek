import { Input } from "@/components/ui/Input";
import React from "react";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import styles from "./history.module.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const OrderHistory = () => {
  return (
    <div className="flex flex-col px-[5em]">
      <p className="mt-4">Home | My orders | orders history</p>
      <div className="w-fit self-end rounded-xl bg-gray2 text-[#8b8b8b] px-4 py-3 flex items-center flex-row-reverse gap-3">
        <PiMagnifyingGlassThin className="w-[24px] h-[24px]" />

        <Input
          className={`bg-transparent border-none ${styles.search}`}
          placeholder="Search order code"
        />
      </div>
      <div className="historyContainer mt-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger
              className={`bg-secondary px-[3em] py-6 rounded-xl  relative text-onColor -mb-3 text-lg ${styles.customIcon}`}
            >
              <div className="flex w-full ">
                <div className="historyDetails flex flex-col items-start">
                  <p className="text-onColor">Order code:&nbsp;43453</p>
                  <p className="text-onColor">
                    Order submitted:&nbsp;2024.04.08 14:50
                  </p>
                </div>
                <p className="justify-self-center absolute top-6 left-[50%] translate-x-[-50%] text-onColor">
                  Product Name: Maybelline lipstick code A23
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border border-gray3 border-t-transparent text-base rounded-b-xl">
              <div className="bodyContainer mt-6 space-y-8">
                <section>
                  <p className="font-bold text-lg ml-2">Order info:</p>
                  <div className="flex bg-gray3 justify-around p-4 items-center">
                    <div className="prodDetails flex gap-2 items-center">
                      <div className="px-[2em] border border-gray2 rounded-3xl">
                        <Image
                          src={"/kafsh.svg"}
                          alt="belt"
                          width={77}
                          height={112}
                        />
                      </div>
                      <div>
                        <p className="font-bold">
                          {" "}
                          Maybelline lopstick code A23
                        </p>
                        <p> no:3445</p>
                        <p> color: warm red</p>
                      </div>
                    </div>
                    <div className="price">
                      <p className="font-bold">Price:</p>
                      <p>340$</p>
                    </div>
                    <div className="submitDate">
                      <p className="font-bold">Orde submitted:</p>
                      <p> 2024.04.08</p>
                    </div>

                    <p className="px-6 py-3 rounded-3xl bg-green">Arrived</p>
                  </div>
                </section>
                <section>
                  <p className="font-bold text-lg ml-2">Send to:</p>
                  <div className="flex bg-gray3 justify-around p-4 items-center">
                    <div className="prodDetails flex gap-2 items-center">
                      <div>
                        <p className="font-bold">Name:</p>
                        <p> Mohamad Ayyed</p>
                      </div>
                    </div>
                    <div className="price">
                      <p className="font-bold">Address:</p>
                      <p>
                        No.5, 3rd alley, 45 St. Noah Sq. District 2, Cyprus.
                      </p>
                    </div>
                    <div className="submitDate">
                      <p className="font-bold">send method:</p>
                      <p> Delivery</p>
                    </div>

                    <div className="submitDate">
                      <p className="font-bold">Arrived time:</p>
                      <p> 2024.06.24</p>
                    </div>
                  </div>
                </section>
                <section>
                  <p className="font-bold text-lg ml-2">Payment: </p>
                  <div className="flex bg-gray3 justify-around p-4 items-center">
                    <div className="prodDetails flex gap-2 items-center">
                      <div>
                        <p className="font-bold">payment method:</p>
                        <p> IBAN</p>
                      </div>
                    </div>
                    <div className="price">
                      <p className="font-bold">Name:</p>
                      <p>Mohammad Ayyed</p>
                    </div>
                    <div className="submitDate">
                      <p className="font-bold">Bank Name:</p>
                      <p className="font-bold"> cdbBank</p>
                    </div>

                    <div className="submitDate">
                      <p className="font-bold">Bank receipt no:</p>
                      <p> 234435667</p>
                    </div>
                    <div className="submitDate">
                      <p className="font-bold">payment time:</p>
                      <p> 2024.06.04 &nbsp; 11:45</p>
                    </div>
                  </div>
                </section>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <div className="flex flex-col items-center">
          <p className="font-semibold">Your order history is empty</p>
          <Image src={"/cart.svg"} alt="cart" width={450} height={400} />
        </div> */}
      </div>
    </div>
  );
};

export default OrderHistory;
