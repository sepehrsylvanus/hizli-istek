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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useGetCountries } from "@/hooks/useGetCountries";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

// ============= MAIN COMPONENT ============
const AuthModal = () => {
  const [step, setStep] = useState("phone");
  const [codes, setCodes] = useState<String[]>([]);
  //   ============ FORM CONFIGS============
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  //   ========= END OF FORM CONFIGS========

  // ============== CUSTOM HOOKS ============

  const { data: countries, isLoading: isCountriesLoading } = useGetCountries();
  console.log(countries);
  // ============== END OF CUSTOM HOOKS ============
  useEffect(() => {
    countries?.forEach((country) => {
      const code = `${country.idd.root}${country.idd.suffixes}`;
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Login / Register</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add your phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
