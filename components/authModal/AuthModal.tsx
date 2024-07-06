"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, set, useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useGetCountries } from "@/hooks/useGetCountries";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { users } from "@/constants/fakeData";

type Code = {
  image: string;
  code: string;
  alt: string;
};

// ============= MAIN COMPONENT ============
const AuthModal = () => {
  const [step, setStep] = useState("phone");
  const [codes, setCodes] = useState<Code[]>([]);
  const [OTP, setOTP] = useState<number>();
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    console.log(sent);
  }, [sent]);

  //   ============ FORM CONFIGS============

  const formSchema = z.object({
    code: z.string(),
    phoneNumber: z.string(),
    password: z.string().optional().or(z.literal("")),
    otp: z.string().optional().or(z.literal("")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "+357",
      phoneNumber: "",
    },
  });
  const otpCode = form.watch("otp");
  const errors = Object.values(form.formState.errors).map(
    (error) => error.message
  );
  console.log(errors);
  const errorKeys = Object.keys(form.formState.errors);

  const codeVal = form.watch("code");
  const mobileVal = form.watch("phoneNumber");
  const buttonThings: Code[] = codes.filter((item) => item.code === codeVal);
  console.log(buttonThings);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const otp = Number(values.otp);
    console.log(otp);
    console.log(OTP);
    const mobile = values.code + values.phoneNumber;
    const userExist = users.some((user) => user.mobile === mobile);
    console.log(userExist);
    console.log(mobile);
    console.log(step);
    if (step === "phone") {
      console.log("here");
      if (userExist) {
        setStep("login");
      } else {
        setStep("register");
      }
    } else if (step === "login") {
      console.log("here");
      const user = users.find((user) => user.mobile === mobile);
      if (user?.password === values.password) {
      } else {
        form.setError("password", {
          type: "manual",
          message: "Your password is not valid",
        });
      }
    } else if (step === "register") {
      console.log("here");
      if (OTP !== otp && values.otp?.length === 4) {
        console.log("here");
        form.setError("otp", {
          type: "manual",
          message: "Your code is not valid",
        });
      }
    }
  }
  //   ========= END OF FORM CONFIGS========

  // ============== CUSTOM HOOKS ============

  useEffect(() => {
    console.log(step);
  }, [step]);

  const { data: countries, isLoading: countriesLoading } = useGetCountries();
  console.log(countries);
  const standardCountries = countries?.filter(
    (country) =>
      country.name.common === "Iran" ||
      country.name.common === "Cyprus" ||
      country.name.common === "Turkey"
  );
  console.log(standardCountries);
  // ============== END OF CUSTOM HOOKS ============

  // =============== UTILS =============
  function getRandom4DigitNumber() {
    setSent(true);
    setCountdown(105);
    const OTP = Math.floor(Math.random() * 9000) + 1000;
    setOTP(OTP);
    alert(OTP);
  }

  // =============== END OF UTILS =============

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setSent(false);
    }
  }, [countdown]);

  useEffect(() => {
    standardCountries?.forEach((country) => {
      console.log(country.flags.svg);
      console.log(country.idd);

      const code = {
        image: country.flags.svg,
        code: `${country.idd.root}${country.idd.suffixes}`,
        alt: country.flags.alt,
      };
      setCodes((prev) => [...prev, code]);
    });
  }, [countries]);

  useEffect(() => {
    console.log(codes);
  }, [codes]);

  return (
    <Dialog>
      <DialogTrigger className="bg-white mr-[4.6em] py-3 px-[1.75em] rounded-xl hover:text-onColor transition hover:bg-primary">
        Login
      </DialogTrigger>
      <DialogContent className="h-[522px] x-[522px] flex flex-col pb-[3em] overflow-hidden px-[3.5em]">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center text-[20px]">
            {step === "phone"
              ? "Login/Register"
              : step === "login"
              ? "Login"
              : "Register"}
            {errors.length === 0 && (
              <p className="text-tertiary text-[18px] font-semibold text-center invisible">
                Placeholder
              </p>
            )}
            <div className="overflow-auto max-h-[100px]">
              {/* Add overflow handling and a max height */}
              {errors.map((error, index) => (
                <p
                  key={index}
                  className="text-tertiary text-[18px] font-semibold text-center"
                >
                  {error}
                </p>
              ))}
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          {countriesLoading ? (
            <div className="flex justify-center">
              <Image
                src={"/loader.gif"}
                alt="loader"
                width={200}
                height={200}
              />
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`${
                step !== "register" ? "mt-[4em]" : "mt-[2em]"
              } flex flex-col justify-between h-full`}
            >
              {(step.includes("phone") || step === "login") && (
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[18px] font-normal">
                        Add your phone number
                      </FormLabel>
                      <FormControl>
                        <div className="border border-primary rounded-xl flex items-center px-2 h-[56px]">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center">
                              <Button className="bg-transparent hover:bg-transparent outline-none text-[18px] pr-0">
                                <Image
                                  src={buttonThings[0]?.image}
                                  alt={buttonThings[0]?.alt}
                                  width={24}
                                  height={24}
                                  className="mr-2"
                                />
                                {buttonThings[0]?.code}
                                <FaAngleDown />
                                <Separator
                                  orientation="vertical"
                                  className="mx-[10px]"
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              <Controller
                                name="code"
                                control={form.control}
                                render={({ field }) => (
                                  <DropdownMenuRadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    {codes.map((code, index) => (
                                      <DropdownMenuRadioItem
                                        key={index}
                                        value={code.code}
                                        className="text-[18px]"
                                      >
                                        <Image
                                          src={code.image}
                                          alt={code.alt}
                                          width={24}
                                          height={24}
                                          className="mr-2"
                                        />
                                        {code.code}
                                      </DropdownMenuRadioItem>
                                    ))}
                                  </DropdownMenuRadioGroup>
                                )}
                              />
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Input
                            placeholder="22XXXXXX"
                            {...field}
                            className="border-none outline-none rounded-xl text-[18px] bg-transparent pl-0"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {step === "login" && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[18px] font-normal">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password..."
                          {...field}
                          type="password"
                          className={`border ${
                            errorKeys.includes("password")
                              ? "border-tertiary"
                              : "border-primary"
                          } rounded-xl flex items-center px-2 h-[56px] pl-8 text-[18px] outline-none`}
                        />
                      </FormControl>
                      <FormDescription className="text-textColor text-base">
                        Do you forget your password?
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}
              {step === "register" && (
                <div className="h-full">
                  <p className=" text-[18px] ">Your phone number</p>
                  <div className="flex gap-7 mt-6">
                    <p className=" text-[18px] ">{codeVal}</p>
                    <p className=" text-[18px] ">{mobileVal}</p>
                  </div>

                  <div className="flex mt-[3em] flex-col">
                    <p className=" text-[18px] ">OTP code</p>
                    <div className="flex justify-between items-center">
                      <Button
                        className={`${
                          sent
                            ? "bg-[#D9D9D9] w-fit text-[#7E7E7E] pointer-events-none text-[14px]"
                            : " text-onColor  w-[154px] text-[18px]"
                        } rounded-xl   h-[56px] font-light mr-2`}
                        onClick={getRandom4DigitNumber}
                      >
                        {sent
                          ? `Request code after ${(
                              countdown / 60
                            ).toFixed()} : ${countdown % 60}`
                          : "Request code"}
                      </Button>
                      <Controller
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                          <InputOTP
                            maxLength={4}
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <InputOTPSlot
                              className={` w-[56px] h-[56px] rounded-xl ${
                                sent &&
                                errorKeys.includes("otp") &&
                                "border-tertiary"
                              }`}
                              index={0}
                            />
                            <InputOTPSlot
                              className={` w-[56px] h-[56px] rounded-xl ${
                                sent &&
                                errorKeys.includes("otp") &&
                                "border-tertiary"
                              }`}
                              index={1}
                            />

                            <InputOTPSlot
                              className={` w-[56px] h-[56px] rounded-xl ${
                                sent &&
                                errorKeys.includes("otp") &&
                                "border-tertiary"
                              }`}
                              index={2}
                            />
                            <InputOTPSlot
                              className={` w-[56px] h-[56px] rounded-xl ${
                                sent &&
                                errorKeys.includes("otp") &&
                                "border-tertiary"
                              }`}
                              index={3}
                            />
                          </InputOTP>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              <Button
                type="submit"
                className="text-onColor mx-auto text-[20px] font-light w-[192px] h-[64px] rounded-2xl"
              >
                Next
              </Button>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
