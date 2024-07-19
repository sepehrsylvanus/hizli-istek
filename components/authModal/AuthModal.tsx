"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
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
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";

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
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/AuthContext";
import { useAuthModal } from "@/features/AuthModalContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { nextLeve } from "@/features/stepSlice";
import { toggle } from "@/features/openAuthSlice";
import Cookies from "js-cookie";

import { login, registerUser, sendPhoneNumber } from "@/actions/authActions";
import { useSetToken } from "@/hooks/useUser";
type Code = {
  image: string;
  code: string;
  alt: string;
};

interface testProps {
  step: string;
  openAuth: boolean;
}

// ============= MAIN COMPONENT ============
const AuthModal: FC<testProps> = ({ step, openAuth }) => {
  const route = useRouter();
  console.log(step, openAuth);
  useEffect(() => {
    console.log(step, openAuth);
  }, [step, openAuth]);

  const pathName = usePathname();
  const dispatch = useDispatch();
  const { mutate } = useSetToken();
  // =========== STATES ===========

  const [codes, setCodes] = useState<Code[]>([]);
  const [OTP, setOTP] = useState<number>();
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [btnDisable, setBtnDisable] = useState(true);

  // =========== END OF STATES ===========

  //   ============ FORM CONFIGS============

  const formSchema = z.object({
    code: z.string(),
    phoneNumber: z.string(),
    password: z
      .string()
      .min(6, { message: "It must be more than 5 characters." })
      .optional()
      .or(z.literal("")),
    otp: z.string().optional().or(z.literal("")),
    name: z.string().optional().or(z.literal("")),
    lastName: z.string().optional(),
    repeatPassword: z
      .string()
      .min(6, { message: "It must be more than 6 characters." })
      .optional()
      .or(z.literal("")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "+357",
      phoneNumber: "",
      otp: "",
      name: "",
      password: "",
      repeatPassword: "",
    },
  });

  const errors = Object.values(form.formState.errors).map(
    (error) => error.message
  );

  const errorKeys = Object.keys(form.formState.errors);
  //   ========= END OF FORM CONFIGS========

  // ========== WATCH VALUES ===========

  const codeVal = form.watch("code");
  const otpCode = form.watch("otp");

  const mobileVal = form.watch("phoneNumber");
  const name = form.watch("name");
  const password = form.watch("password");
  const repeatPassword = form.watch("repeatPassword");
  const mobile = codeVal + mobileVal;
  console.log(mobile);
  const repeatPassError = form.formState.errors.repeatPassword?.message;
  const passError = form.formState.errors.password?.message;
  const token = Cookies.get("token");
  console.log(token);
  console.log(mobile);
  // =========== END OF WATCH VALUES ==========

  const buttonThings: Code[] = codes.filter((item) => item.code === codeVal);
  // ========= FORM SUBMIT =========

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const otp = Number(values.otp);

    const mobile = values.code + values.phoneNumber;
    const userExist = users.some((user) => user.mobile === mobile);

    const sendPhone = await sendPhoneNumber(mobile);
    if (step === "phone") {
      console.log(sendPhone);
      if (sendPhone.status === "signup") {
        dispatch(nextLeve("register"));
      } else if (sendPhone.status === "login") {
        dispatch(nextLeve("login"));
      }
    } else if (step === "login") {
      const user = users.find((user) => user.mobile === mobile);
      const ifLogin = await login(values.password!, sendPhone.token);
      console.log(ifLogin);

      if (ifLogin) {
        mutate(sendPhone.token);

        dispatch(toggle(false));
      } else {
        form.setError("password", {
          type: "manual",
          message: "Your password is not valid",
        });
      }
    } else if (step === "register") {
      console.log(otp);
      console.log(OTP);
      console.log(token);
      if (OTP !== otp || values.otp?.length !== 4) {
        form.setError("otp", {
          type: "manual",
          message: "Your code is not valid",
        });
      } else {
        if (token) {
          dispatch(nextLeve("editProf"));
          return;
        }
        dispatch(nextLeve("finalRegister"));
      }
    } else if (step === "finalRegister") {
      if (password !== repeatPassword) {
        form.setError("repeatPassword", {
          type: "manual",
          message: "Passwords doesn't match",
        });
      }

      const ifRegistered = await registerUser(
        values.name!,
        values.password!,
        sendPhone.token,
        values.lastName
      );
      console.log(ifRegistered);
      if (ifRegistered) {
        mutate(sendPhone.token);
      }
      dispatch(toggle(false));
    }
  }
  // ========= END OF FORM SUBMIT =========

  // ============== CUSTOM HOOKS ============

  useEffect(() => {
    console.log(step);
  }, [step]);

  const { data: countries, isLoading: countriesLoading } = useGetCountries();

  const standardCountries = useMemo(() => {
    return countries?.filter(
      (country) =>
        country.name.common === "Iran" ||
        country.name.common === "Cyprus" ||
        country.name.common === "Turkey"
    );
  }, [countries]);

  // ============== END OF CUSTOM HOOKS ============

  // =============== UTILS =============
  function getRandom4DigitNumber() {
    setSent(true);
    setCountdown(105);
    const OTP = Math.floor(Math.random() * 9000) + 1000;
    setOTP(OTP);
    alert(OTP);
    console.log("OTP => ", OTP);
  }

  // =============== END OF UTILS =============

  // ============ HANDLE EFFECTS ===========

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setSent(false);
    }
  }, [countdown]);

  useEffect(() => {
    const codes: { image: string; code: string; alt: string }[] = [];
    standardCountries?.forEach((country) => {
      console.log(country.flags.svg);
      console.log(country.idd);

      const code = {
        image: country.flags.svg,
        code: `${country.idd.root}${country.idd.suffixes}`,
        alt: country.flags.alt,
      };
      codes.push(code);
    });
    setCodes(codes);
  }, [countries]);

  useEffect(() => {
    console.log(codes);
  }, [codes]);

  useEffect(() => {
    console.log(btnDisable);
  }, [btnDisable]);

  console.log(step);
  console.log(mobileVal.length);

  useEffect(() => {
    if (step === "phone") {
      setBtnDisable(mobileVal.length === 0);
    } else if (step === "register") {
      setBtnDisable(otpCode?.length !== 4);
    } else if (step === "finalRegister") {
      setBtnDisable(
        name?.length === 0 ||
          password?.length === 0 ||
          repeatPassword?.length === 0
      );
    }
  }, [step, mobileVal, otpCode, name, password, repeatPassword]);

  useEffect(() => {
    console.log(openAuth);
  }, [openAuth]);

  // ============== END OF HANDLE EFFECTS ==========

  return (
    <Dialog open={openAuth} onOpenChange={(isOpen) => dispatch(toggle(isOpen))}>
      {step !== "editProf" && (
        <DialogTrigger className="bg-white mr-[4.6em] py-3 px-[1.75em] rounded-xl hover:text-onColor transition hover:bg-primary">
          Login
        </DialogTrigger>
      )}
      <DialogContent className="h-[522px] x-[522px] flex flex-col pb-[3em] overflow-hidden px-[3.5em]">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center text-[20px]">
            {!token && step === "phone"
              ? "Login/Register"
              : !token && step === "login"
              ? "Login"
              : !token &&
                (step === "finalRegister" || "register") &&
                "Register"}
            {token && (step === "phone" || step === "register") && "Edit phone"}
            {token && step === "editProf" && "My Account"}
            {errors.length === 0 && step !== "finalRegister" && (
              <p className="text-tertiary text-[18px] font-semibold text-center invisible">
                Placeholder
              </p>
            )}
            {step === "finalRegister" && (
              <p className=" text-center font-normal text-lg">
                Your phone number : {codeVal} {mobileVal}{" "}
              </p>
            )}
            {step === "editProf" && (
              <p className=" text-center font-normal text-lg flex  justify-center gap-2">
                Your phone number : {codeVal} {mobileVal}
                <Image
                  onClick={() => dispatch(nextLeve("phone"))}
                  src={"/icons/edit.svg"}
                  alt="edit"
                  width={24}
                  height={24}
                  className=" cursor-pointer"
                />
              </p>
            )}
            <div className="overflow-auto max-h-[100px]">
              {/* Add overflow handling and a max height */}
              {step !== "finalRegister" &&
                errors.map((error, index) => (
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
                step.includes("phone") || step.includes("login")
                  ? "mt-[4em]"
                  : "mt-[2em]"
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
                              <Button className="bg-transparent hover:bg-transparent outline-none text-[18px] pr-0 text-textColor">
                                <Image
                                  src={buttonThings[0]?.image}
                                  alt={buttonThings[0]?.alt}
                                  width={24}
                                  height={24}
                                  className="mr-2"
                                />
                                {buttonThings[0]?.code}
                              </Button>
                              <FaAngleDown className="ml-[1em]" />
                            </DropdownMenuTrigger>
                            <Separator
                              orientation="vertical"
                              className="mx-[10px]"
                            />
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
                            // onChange={handleChangeTest}
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
                            ? "bg-[#D9D9D9] w-fit text-[#7E7E7E] pointer-events-none text-[14px] "
                            : " text-onColor  w-[154px] text-[18px]"
                        } rounded-xl   h-[56px] font-light mr-2`}
                        onClick={getRandom4DigitNumber}
                        disabled={sent}
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
              {(step === "finalRegister" || step === "editProf") && (
                <div className="grid grid-cols-2 grid-rows-2 gap-x-[3em] gap-y-[2.5em] w-[424px]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-lg">
                          Name:
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border border-primary rounded-xl  h-[56px] pl-4 outline-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-lg">
                          password:
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-[188px] border border-primary rounded-xl h-[56px] text-center outline-none"
                          />
                        </FormControl>

                        {errorKeys.length === 0 && (
                          <p className=" text-[14px] absolute invisible">
                            this is an error
                          </p>
                        )}
                        {passError && errorKeys.includes("password") && (
                          <p className="text-tertiary  w-full text-[14px] absolute">
                            {passError}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-lg">
                          Last name:
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border border-primary rounded-xl h-[56px]  pl-4 outline-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-lg">
                          Repeat password:
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border border-primary rounded-xl h-[56px] text-center outline-none"
                          />
                        </FormControl>

                        {errorKeys.length === 0 && (
                          <p className=" text-[14px] absolute invisible">
                            this is an error
                          </p>
                        )}
                        {repeatPassError &&
                          errorKeys.includes("repeatPassword") && (
                            <p className="text-tertiary  w-full text-[14px] absolute">
                              {repeatPassError}
                            </p>
                          )}
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <Button
                type="submit"
                className="text-onColor mx-auto text-[20px] font-light w-[192px] h-[64px] rounded-2xl disabled:bg-[#D9D9D9] disabled:text-[#7E7E7E]"
                disabled={btnDisable}
              >
                {token ? "Save" : "Next"}
              </Button>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
