"use client";
import { navItems } from "@/constants/navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "../authModal/AuthModal";
import { getToken } from "@/lib/serverUtils";
import LoggedInUser from "../loggedInUser/LoggedInUser";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./Button";
import { logout } from "@/features/authSlice";
import Cookies from "js-cookie";
import { useGetUser } from "@/hooks/useUser";
import { getMe } from "@/actions/authActions";
import { nextLeve } from "@/features/stepSlice";
const Navbar = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const token = Cookies.get("token");
  const pathName = usePathname();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.value);

  const [showProf, setshowProf] = useState(false);

  const updateAuthState = () => {
    const token = getToken();
    console.log(token);
    setshowProf(!!token);
  };

  const dispatch = useDispatch();
  console.log(token);

  // ============ HANDLE EFFECT ===========
  useEffect(() => {
    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        const user = await getMe(token);

        setCurrentUser(user);
      }
    };
    fetchCurrentUser();
  }, [token]);

  // ============ END OF HANDLE EFFECT ===========

  const openAuth = useSelector((state: RootState) => state.openAuth.value);
  const step = useSelector((state: RootState) => state.step.value);
  console.log(openAuth, step);
  console.log(token);
  const handleLogout = () => {
    dispatch(logout());

    setLogoutOpen(false);
    dispatch(nextLeve("phone"));
    router.refresh();
  };

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
                href={navItem.path}
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
      {((pathName === "/" && !currentUser) || openAuth || !token) && (
        <div className="navRight">
          <AuthModal openAuth={openAuth} step={step} />
        </div>
      )}

      {pathName === "/" && currentUser && token && (
        <div className="navRight">
          <LoggedInUser setLogoutOpen={setLogoutOpen} />
        </div>
      )}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent
          showClose={false}
          className="w-[500px] h-[236px] px-[3em]"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Do you really want to log out?
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-6 justify-center my-[3.75em]">
            <Button
              variant="outline"
              className="w-[192px] h-[64px] py-5 rounded-xl text-xl"
              onClick={() => setLogoutOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="w-[192px] h-[64px] py-5 rounded-xl text-xl"
            >
              Yes, Log out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
