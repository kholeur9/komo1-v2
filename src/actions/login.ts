"use server";

import * as z from "zod";

import { loginSchema } from "@/schemas";

import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { signIn } from "@/auth";

import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginSchema>) => {
  
  const validateFields = loginSchema.safeParse(values);

  console.log(`validateFields: ${JSON.stringify(validateFields)}`)

  if(!validateFields.success) {
    return { error : "Verifier vos informations"};
  }

  const { number } = validateFields.data;

  try {
    await signIn("credentials", { 
      number,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch(error.type) {
        case "CredentialsSignin":
          return { error : "Verifier votre numéro de téléphone"}
        default:
          return { error : "Erreur inconnue"};
      }
    }
    throw error;
  }

  return { success : "Numéro de téléphone valide"};
}