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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useGetCountries } from "@/hooks/useGetCountries";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { Separator } from "../ui/separator";

type Code = {
  image: string;
  code: string;
  alt: string;
};
const formSchema = z.object({
  code: z.string(),
  phoneNumber: z.string(),
});

// ============= MAIN COMPONENT ============
const AuthModal = () => {
  const [step, setStep] = useState("phone");
  const [codes, setCodes] = useState<Code[]>([]);
  //   ============ FORM CONFIGS============
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "+357",
      phoneNumber: "",
    },
  });
  const codeVal = form.watch("code");
  console.log(codeVal);
  const buttonThings: Code[] = codes.filter((item) => item.code === codeVal);
  console.log(buttonThings);
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  //   ========= END OF FORM CONFIGS========

  // ============== CUSTOM HOOKS ============

  const { data: countries, isLoading: isCountriesLoading } = useGetCountries();
  console.log(countries);
  const standardCountries = countries?.filter(
    (country) =>
      country.name.common === "Iran" ||
      country.name.common === "Cyprus" ||
      country.name.common === "Turkey"
  );
  console.log(standardCountries);
  // ============== END OF CUSTOM HOOKS ============
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
      <DialogContent className="h-[522px] x-[522px] flex flex-col pb-[3em]">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center text-[20px]">
            Login / Register
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-[4em] flex flex-col justify-between h-full"
          >
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[18px] font-normal">
                    Add your phone number
                  </FormLabel>
                  <FormControl>
                    <div className=" border border-primary rounded-xl flex items-center px-2 h-[56px]">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center">
                          <Button className="bg-transparent hover:bg-transparent outline-none text-[18px]">
                            <Image
                              src={buttonThings[0].image}
                              alt={buttonThings[0].alt}
                              width={24}
                              height={24}
                              className="mr-2"
                            />
                            {buttonThings[0].code}
                            <FaAngleDown />
                            <Separator
                              orientation="vertical"
                              className="mx-4"
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
                        placeholder="shadcn"
                        {...field}
                        className=" border-none outline-none rounded-xl text-[18px] bg-transparent"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="text-onColor  mx-auto  text-[24px] font-light w-[192px] h-[64px] rounded-2xl"
            >
              Next
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
