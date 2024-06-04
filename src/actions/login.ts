"use server";

import * as z from "zod";

import { loginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof loginSchema>) => {
  
  const validateFields = loginSchema.safeParse(values);

  console.log(`validateFields: ${JSON.stringify(validateFields)}`)

  if(!validateFields.success) {
    return { error : "Verifier vos informations"};
  }

  return { success : "Numéro de téléphone valide"};
}