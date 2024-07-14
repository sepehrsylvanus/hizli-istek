"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cardDetails } from "@/constants/payment";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Payment: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("cCard");

  // ========= FORM CONFIGS ========

  const formSchema = z.object({
    name: z.string().min(3).max(50),
    bankReceipt: z.string(),
    date: z.array(z.string()),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bankReceipt: "",
      date: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // ========= END OF FORM CONFIGS ========

  return (
    <div className="h-full flex flex-col items-center justify-between px-[5em]">
      <div className="w-full flex gap-8">
        <div className="left w-full flex-1">
          <div className="chooseCard">
            <div className="titleContainer py-6 px-4 bg-gray2 rounded-t-xl">
              <p className="text-[18px] font-[500] text-textColor flex gap-3">
                <Image
                  src={"/icons/circleOrange.svg"}
                  alt="marker"
                  width={12}
                  height={12}
                />
                Payment method
              </p>
            </div>
            <RadioGroup
              defaultValue="cCard"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="mt-6 space-y-4"
            >
              <div className="flex items-center space-x-5">
                <Image
                  src={"/icons/cards.svg"}
                  alt="cards"
                  width={24}
                  height={24}
                />
                <RadioGroupItem value="cCard" id="cCard" />
                <Label htmlFor="cCard" className="text-base">
                  Credit Card
                </Label>
              </div>
              <div className="flex items-center space-x-5">
                <Image
                  src={"/icons/iban.svg"}
                  alt="cards"
                  width={24}
                  height={24}
                />
                <RadioGroupItem value="iban" id="iban" />
                <Label htmlFor="iban" className="text-base">
                  IBAN
                </Label>
              </div>
              <div className="flex items-center space-x-5">
                <Image
                  src={"/icons/card.svg"}
                  alt="cards"
                  width={24}
                  height={24}
                />
                <RadioGroupItem value="iCard" id="iCard" />
                <Label htmlFor="iCard" className="text-base">
                  Iran card
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div
            className={`details px-8 py-6 bg-gray2 ${
              paymentMethod === "iban" ? "rounded-t-xl" : "rounded-xl"
            } mt-[3em] space-y-3`}
          >
            {cardDetails.map((detail, index) => (
              <p key={index}>
                <span className="font-bold">{detail.name}: </span>
                {detail.value}
              </p>
            ))}
          </div>
          {paymentMethod === "iban" && (
            <div className="py-3 px-8 flex justify-between items-center">
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Maria Amman..."
                              {...field}
                              className="rounded-xl"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankReceipt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank receipt no. </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Maria Amman..."
                              {...field}
                              className="rounded-xl"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name:</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                placeholder="1"
                                {...field}
                                className="rounded-xl"
                              />
                              <InputOTPSeparator />
                              <Input
                                placeholder="2"
                                {...field}
                                className="rounded-xl"
                              />
                              <InputOTPSeparator />
                              <Input
                                placeholder="3"
                                {...field}
                                className="rounded-xl"
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Test</Button>
                  </form>
                </Form>
              </div>

              <div className="relative w-[12.5rem] h-[12.5rem] rounded-xl">
                <Image
                  src={"/empty.jpeg"}
                  alt="empty"
                  fill
                  className="absolute rounded-xl"
                />
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full text-center flex flex-col items-center">
                  <Image
                    src={"/icons/mountain.svg"}
                    alt="mountain"
                    width={40}
                    height={40}
                  />
                  <p className="text-[14px] font-semibold">
                    upload your reciept here
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="right flex-1 space-y-8">
          <div className="w-full rounded-3xl bg-primaryContainer py-[2em] px-[2.5em]">
            <p className="text-[18px] font-[500] text-textColor flex gap-3">
              <Image
                src={"/icons/circleOrange.svg"}
                alt="marker"
                width={12}
                height={12}
              />
              Total amount: 5400 $
            </p>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="border border-gra3 pr-4 pl-[5rem] rounded-2xl">
                <p className="text-[18px] font-[500] text-textColor flex gap-3">
                  <Image
                    src={"/icons/circleOrange.svg"}
                    alt="marker"
                    width={12}
                    height={12}
                  />
                  Product details 1
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="flex justify-between pl-4 pr-[3.5em]">
                    <div className="flex gap-6 mt-3 items-center">
                      <div className="px-[2em] py-4 border border-gray2 rounded-3xl">
                        <Image
                          src={"/kafsh.svg"}
                          alt="belt"
                          width={77}
                          height={112}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p>Brown Belt from </p>
                        <p>W:35 ml</p>
                      </div>
                    </div>

                    <Image
                      src={"/amazon.svg"}
                      alt="amazon"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex flex-col gap-6 mt-6">
                    <p className=" text-textColor flex gap-3">
                      <Image
                        src={"/icons/circleOrange.svg"}
                        alt="marker"
                        width={12}
                        height={12}
                        className="opacity-50"
                      />
                      product amount: 46000 $
                    </p>
                    <p className=" text-textColor flex gap-3">
                      <Image
                        src={"/icons/circleOrange.svg"}
                        alt="marker"
                        width={12}
                        height={12}
                        className="opacity-50"
                      />
                      Post amount:65 $
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <Button className="bg-tertiary hover:bg-tertiaryHover w-fit text-white font-normal text-[20px]  px-[4em] py-8 rounded-2xl">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Payment;
