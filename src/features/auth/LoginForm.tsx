'use client';

import { useState, useTransition } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"; 
  
import { loginSchema } from "@/schemas";
import { useForm } from "react-hook-form";

import { FormSuccess } from "@/features/auth/form-success";
import { FormError } from "@/features/auth/form-error";

import { login } from "@/actions/login";


import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  const [ success, setSuccess ] = useState<string>("");
  const [ error, setError ] = useState<string>("");
  const [ isPending, startTransition ] = useTransition();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      number: "",
    }
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      login(values)
      .then((data) => {
        if (data && data.success){
          setSuccess(data.success)
        } else if (data && data.error) {
          setError(data.error);
        }
      })
      
    })
  }
  
  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      <div className="flex flex-col items-center space-y-8">
        <img src="/logo.heic" className="w-[80px]" />
        <h1 className="text-2xl font-semibold text-white">Vos forfaits en un clique</h1>
        <h2 className="text-center text-sm text-white">Entrez votre numéro de téléphone, et convertissez vos crédits en forfait internet!</h2>
      </div>
      <div className="w-[370px] flex flex-col items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="flex flex-col space-y-4">
              <FormField
                name="number"
                control={form.control}
                render={({ field}) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="text"
                        placeholder="Numéro de téléphone"
                        className="w-full bg-white border-transparent h-[50px] px-2.5 text-md focus:border focus:border-blue-500 outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full h-[50px] border-transparent bg-[#0D375A] outline-none">
              {isPending ? "Chargement..." : <span>Valider</span>}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}