"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

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
      }  h-[80px] flex items-center font-robotoCondensed text-lg`}
    >
      <div className="navLeft  flex h-full items-center">
        <Link
          href={"/"}
          className="mr-[3.5em] h-full flex  bg-onColor items-center px-2"
        >
          <Image src={"/hiShop.svg"} alt="logo" width={59} height={59} />
        </Link>
        <div className="flex gap-10 items-center">
          <Link
            href={"/"}
            className={`${
              pathName === "/" && "font-bold  border-b-2 border-onColor"
            }`}
          >
            Home
          </Link>
          <Link href={"/"}>Track orders</Link>
          <Link href={"/"}>Order history</Link>
          <Link href={"/"}>About us</Link>
          <Link href={"/"}>Contact us</Link>
        </div>
      </div>
      <div className="navRight"></div>
    </nav>
  );
};

export default Navbar;
