"use client";
import { navItems } from "@/constants/navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Button } from "./Button";
import AuthModal from "../authModal/AuthModal";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <nav
      className={`${
        pathName === "/"
          ? "bg-primaryContainer text-textColor"
          : "bg-tertiary text-onColor"
      }  h-[80px] z-50 flex items-center font-robotoCondensed text-lg justify-between`}
    >
      <div className="navLeft  flex h-full items-center">
        <Link
          href={"/"}
          className="mr-[3.5em] h-full flex  bg-onColor items-center px-2"
        >
          <Image src={"/hiShop.svg"} alt="logo" width={59} height={59} />
        </Link>
        <div className="flex gap-10 items-center">
          {navItems.map((navItem, index) => (
            <Link
              key={index}
              href={"/"}
              className={`${
                pathName === navItem.path &&
                "font-bold  border-b-2 border-textColor pb-2 relative top-1"
              } flex gap-2`}
            >
              <Image
                src={`/icons/${navItem.icon}`}
                alt={navItem.title}
                width={24}
                height={24}
              />
              {navItem.title}
            </Link>
          ))}
        </div>
      </div>
      {pathName === "/" && (
        <div className="navRight">
          <AuthModal />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
