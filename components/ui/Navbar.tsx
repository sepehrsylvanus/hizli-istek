"use client";
import { navItems } from "@/constants/navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "../authModal/AuthModal";
import { getToken } from "@/lib/serverUtils";
import LoggedInUser from "../loggedInUser/LoggedInUser";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Navbar = () => {
  const pathName = usePathname();
  console.log(pathName);
  const isAuthenticated = useSelector((state: RootState) => state.auth.value);

  console.log(isAuthenticated);
  const [showProf, setshowProf] = useState(false);
  useEffect(() => {
    console.log(showProf);
  }, [showProf]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log(token);
      setshowProf(!!token);
    };
    fetchToken();
  }, []);

  const updateAuthState = () => {
    const token = getToken();
    console.log(token);
    setshowProf(!!token);
  };

  useEffect(() => {
    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);
  const openAuth = useSelector((state: RootState) => state.openAuth.value);
  const step = useSelector((state: RootState) => state.step.value);
  console.log(openAuth, step);

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
          className={`mr-[3.5em] h-full flex  bg-onColor items-center px-2 ${
            pathName !== "/" && "bg-tertiary"
          }`}
        >
          <Image
            src={pathName === "/" ? "/hizliMain.png" : "/hizliOrder.png"}
            alt="logo"
            width={80}
            height={80}
          />
        </Link>
        <div className="flex gap-10 items-center">
          {navItems.map((navItem, index) => {
            console.log(
              `/icons/${navItem.icon}${
                pathName === "/order" ? "White" : null
              }.svg`
            );

            return (
              <Link
                key={index}
                href={"/"}
                className={`${
                  pathName === navItem.path &&
                  "font-bold  border-b-2 border-textColor pb-2 relative top-1"
                } flex gap-2`}
              >
                <Image
                  src={`/icons/${navItem.icon}${
                    pathName === "/order" ||
                    pathName === "/history" ||
                    pathName === "/trackOrder"
                      ? "White"
                      : ""
                  }.svg`}
                  alt={navItem.title}
                  width={24}
                  height={24}
                />
                {navItem.title}
              </Link>
            );
          })}
        </div>
      </div>
      {((pathName === "/" && !isAuthenticated) || openAuth) && (
        <div className="navRight">
          <AuthModal openAuth={openAuth} step={step} />
        </div>
      )}

      {pathName === "/" && isAuthenticated && (
        <div className="navRight">
          <LoggedInUser />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
