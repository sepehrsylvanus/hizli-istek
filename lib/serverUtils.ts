"use server";
import { cookies } from "next/headers";
export const getToken = async () => {
  const cookieStore = await cookies();
  const token = await cookieStore.get("token");
  return token;
};
