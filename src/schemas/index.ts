import * as z from "zod";

export const loginSchema = z.object({
  number: 
    z.string()
    .min(9, { message: "Le numéro de téléphone doit contenir au moins 9 chiffres" })
    .max(9, { message: "Le numéro de téléphone doit contenir au plus 9 chiffres" }),
})