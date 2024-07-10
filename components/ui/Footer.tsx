import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { SlSocialGoogle } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="flex justify-between py-7 px-[4.5em] bg-primaryContainer text-textColor mt-[11.5em] items-center">
      <div className="links ">
        <ul className=" flex marker:text-secondaryContainer text-lg font-semibold list-none gap-8">
          <Link href={"#"}>
            <li className="hover:socialLinks">About us</li>
          </Link>
          <Link href={"#"}>
            <li className="hover:socialLinks">Call us</li>
          </Link>
          <Link href={"#"}>
            <li className="hover:socialLinks">Support</li>
          </Link>
        </ul>
      </div>
      <div className="social flex flex-col justify-between">
        <div className="flex gap-8">
          <Link href={"#"} className="hover:socialLinks ">
            <FaInstagram className="w-[2.5rem] h-[2.5rem]" />
          </Link>
          <Link href={"#"} className="hover:socialLinks ">
            <AiOutlineFacebook className="w-[2.5rem] h-[2.5rem]" />
          </Link>
          <Link href={"#"} className="hover:socialLinks ">
            <SlSocialGoogle className="w-[2.5rem] h-[2.5rem]" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
