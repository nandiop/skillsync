"use server"; // ✅ Ensures this is a Server Component
import { checkUser } from "../lib/checkUser";

export async function ServerUser() {
  const user = await checkUser();
  return user;
}
