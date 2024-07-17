"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/Button";
import { FC } from "react";

interface LoggedInUserProps {
  setLogoutOpen: Dispatch<SetStateAction<boolean>>;
}

const LoggedInUser: FC<LoggedInUserProps> = ({ setLogoutOpen }) => {
  const dispatch = useDispatch();

  const handleMyAcc = () => {
    dispatch(toggle(true));
    dispatch(nextLeve("editProf"));
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
            <AccordionContent>
              <Link href={"/trackOrder"} className="flex gap-2">
                <Image
                  src={"/icons/receiptSearch.svg"}
                  alt="receiptSearch"
                  width={24}
                  height={24}
                />
                <p>Track active orders</p>
              </Link>
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
        <DropdownMenuItem
          className="text-base pl-4 text-tertiary flex gap-2"
          onClick={() => setLogoutOpen(true)}
        >
          <Image
            src={"/icons/logout.svg"}
            alt="logout"
            width={24}
            height={24}
          />
          <p className="text-tertiary">Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoggedInUser;
