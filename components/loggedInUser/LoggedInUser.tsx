"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/features/openAuthSlice";
import { nextLeve } from "@/features/stepSlice";
import { RootState } from "@/app/store";
import { logout } from "@/features/authSlice";
import Link from "next/link";
const LoggedInUser = () => {
  const dispatch = useDispatch();

  const handleMyAcc = () => {
    dispatch(toggle(true));
    dispatch(nextLeve("editProf"));
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white mr-[4.6em] py-2 px-2.5 rounded-2xl hover:text-onColor transition hover:bg-primary flex gap-4 items-center">
        Mohammad Ayyed <CgProfile className="w-8 h-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[12rem] rounded-2xl">
        <DropdownMenuLabel>Mohammad Ayyed </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-base pl-4" onClick={handleMyAcc}>
          My account
        </DropdownMenuItem>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex justify-between text-base items-center px-4 w-full">
              My orders
            </AccordionTrigger>
            <AccordionContent className="flex gap-2">
              <Image
                src={"/icons/receiptSearch.svg"}
                alt="receiptSearch"
                width={24}
                height={24}
              />
              <p>Track active orders</p>
            </AccordionContent>
            <AccordionContent>
              <Link href={"/history"} className="flex gap-2">
                <Image
                  src={"/icons/receiptItem.svg"}
                  alt="receiptItem"
                  width={24}
                  height={24}
                />
                <p>Orders history</p>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <DropdownMenuItem className="text-base pl-4 text-tertiary flex gap-2">
          <Image
            src={"/icons/logout.svg"}
            alt="logout"
            width={24}
            height={24}
          />
          <p className="text-tertiary" onClick={handleLogout}>
            Log out
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoggedInUser;
