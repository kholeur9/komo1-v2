import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "./schemas";

import { getUserByNumber } from "@/data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success){
          const { number } = validatedFields.data;

          const user = await getUserByNumber(number);
          if (!user) return null;
        }
        return null;
      }
    })
  ],
  
} satisfies NextAuthConfig;