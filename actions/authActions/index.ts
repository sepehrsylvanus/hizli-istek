"use server";

import { hizliAuth } from "@/utils/axiosInstance";
import { current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export const sendPhoneNumber = async (mobile: string) => {
  try {
    const res = await hizliAuth.post("/checkuser", { mobile });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = async (
  name: string,
  password: string,
  token: string,
  lastname?: string
) => {
  console.log(name, password, lastname);
  console.log(token);
  try {
    const res = await hizliAuth.post(
      "/signup",
      { name, lastname, password },
      {
        headers: {
          "x-api-key": token,
        },
      }
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getMe = async (token: string) => {
  console.log(token);
  try {
    const currentUser = await hizliAuth.get("get-me", {
      headers: {
        "x-api-key": token,
      },
    });
    console.log(token);
    console.log(currentUser.data.user);
    return currentUser.data.user;
  } catch (error) {
    console.log(error);
  }
};
export const login = async (password: string, token: string) => {
  console.log(password, token);
  try {
    const loginRes = await hizliAuth.post(
      "/login",
      { password },
      {
        headers: {
          "x-api-key": token,
        },
      }
    );
    console.log(loginRes.data);
    return loginRes.data;
  } catch (error) {
    console.log(error);
  }
};
