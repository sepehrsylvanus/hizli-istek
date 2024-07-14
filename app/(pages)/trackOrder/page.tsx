import DeliveryMap from "@/components/ui/DeliveryMap";
import { Input } from "@/components/ui/Input";
import { hizliAuth } from "@/utils/axiosInstance";
import React from "react";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import styles from "../history/history.module.css";
import TrackStepper from "@/components/trackStepper/TrackStepper";
import Image from "next/image";
import { lastOrders } from "@/constants/trackingOrder";
const TrackOrder = () => {
  const data = [
    {
      title: "submit",
      icon: "receipt-item",
    },
    {
      title: "Order Confirmation",
      icon: "tick-circle",
    },
    {
      title: "Purchase",
      icon: "shop-add",
    },
    {
      title: "Send to Cyprus office",
      icon: "shop-add",
    },
    {
      title: "send to user",
      icon: "truck-fast",
    },
    {
      title: "Arrived",
      icon: "truck-fast",
    },
  ];
  return (
    <div className="flex flex-col px-[5em] ">
      <p className="mt-4">Home | My orders | orders history</p>
      <div className="w-fit self-end rounded-xl bg-gray2 text-[#8b8b8b] px-4 py-3 flex items-center flex-row-reverse gap-3">
        <PiMagnifyingGlassThin className="w-[24px] h-[24px]" />

        <Input
          className={`bg-transparent border-none ${styles.search}`}
          placeholder="Search order code"
        />
      </div>
      <div className="flex gap-[3.5em]">
        <p className="font-semibold">Order code:&nbsp;5645567</p>
        <p>
          <span className="font-semibold">Order submitted:</span>
          &nbsp;2024.04.08 14:50
        </p>
      </div>
      <div className=" border border-gray3 rounded-xl mt-4">
        <TrackStepper data={data} />
        <div className="ordersContainer bg-gray2 rounded-b-xl px-8 py-4 flex justify-between">
          <div className="left flex items-center gap-6">
            <div className="bg-primary rounded-full text-onColor w-8 h-8 grid place-content-center">
              <span>1</span>
            </div>
            <div className="prodCard p-4 flex flex-col bg-onColor rounded-xl w-[32.5rem]">
              <div className="flex justify-between items-center ">
                <p className="font-semibold">Product code:43453</p>
                <div className="rounded-3xl px-4 py-2 border border-gray3">
                  <p>credit card</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="px-[2em] border border-gray2 rounded-3xl">
                    <Image
                      src={"/kafsh.svg"}
                      alt="belt"
                      width={77}
                      height={112}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>Maybelline Lipstick code A23 </p>
                    <p>Price:45$</p>
                    <p className="flex items-center gap-2">
                      Color:{" "}
                      <div className="rounded-full w-4 h-4 bg-[#944356]" />
                      <p>details:&nbsp; detail...</p>
                    </p>
                  </div>
                </div>
                <Image
                  src={"/icons/trackIcons/ebay.png"}
                  alt="ebay"
                  width={53}
                  height={40}
                />
              </div>
            </div>
          </div>
          <div className="right h-[11rem] ">
            <DeliveryMap />
          </div>
        </div>
      </div>
      {/* ========= LAST ORDERS ====== */}
      <div className="mt-[5em]">
        <p className="text-lg font-semibold mb-6">Last Orders</p>
        <div className="lastOrdersContainer flex justify-between">
          {lastOrders.map((lastOrder, index) => {
            console.log(`/${lastOrder.brand}.svg`);
            return (
              <div
                key={index}
                className="border border-gray3 rounded-xl relative flex flex-col items-center justify-center space-y-5 py-5 px-10 text-center"
              >
                <Image
                  src={`/${lastOrder.brand}.svg`}
                  alt={lastOrder.title}
                  width={40}
                  height={40}
                  className="absolute top-2 left-2"
                />
                <Image
                  src={lastOrder.img}
                  alt={lastOrder.title}
                  width={145}
                  height={86}
                />
                <p>{lastOrder.title}</p>
                <p>Price: {lastOrder.price}$</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
