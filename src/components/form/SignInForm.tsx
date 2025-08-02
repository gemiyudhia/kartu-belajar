"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Kata sandi harus terdiri dari minimal 8 karakter");

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "email wajib diiisi")
    .refine((val) => z.email(val).safeParse(val).success, {
      message: "email tidak valid",
    }),
  password: passwordSchema,
});

const SignInForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-[500px]">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Selamat Datang Kembali!
          </CardTitle>
          <CardDescription className="text-slate-600">
            Masuk ke akunmu dan lanjutkan belajarmu
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Login */}
          <div className="w-full">
            <Button
              variant="outline"
              className="h-11 w-full bg-transparent cursor-pointer"
            >
              <FcGoogle />
              Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">
                Atau lanjutan dengan
              </span>
            </div>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          placeholder="Masukan Email Anda"
                          className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Kata Sandi
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          //   type={showPassword ? "text" : "password"}
                          placeholder="Masukan Kata Sandi Anda"
                          className="pl-10 pr-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                        <button
                          type="button"
                          //   onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {/* {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )} */}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 cursor-pointer"
              >
                Masuk
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <span className="text-sm text-slate-600">
              Tidak punya akun? {""}
            </span>
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              Daftar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;
