"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { email } from "zod";
import { Github, Lock, Mail, User } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FcGoogle } from "react-icons/fc";

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Kata sandi harus terdiri dari minimal 8 karakter");

const formSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(2, "Nama lengkap wajib diisi dan minimal 2 karakter")
      .max(50, "Nama lengkap tidak boleh lebih dari 50 karakter"),
    email: z
      .string()
      .trim()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Konfirmasi kata sandi tidak sama",
      });
    }
  });

const SignUpForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      <Card className="shadow-xl border-0 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Buat Akun
          </CardTitle>
          <CardDescription className="text-slate-600">
            Yuk, daftar dan mulai belajarmu!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Login */}
          <div className="w-full">
            <Button variant="outline" className="bg-transparent w-full">
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
                Atau lanjutkan dengan
              </span>
            </div>
          </div>

          {/* Register Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          placeholder="Masukan Nama Lengkap"
                          className="pl-10 h-11 border-slate-200 focus:border-green-500 focus:ring-green-500"
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
                          className="pl-10 h-11 border-slate-200 focus:border-green-500 focus:ring-green-500"
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
                          placeholder="Masukan Kata Sandi"
                          className="pl-10 pr-10 h-11 border-slate-200 focus:border-green-500 focus:ring-green-500"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Konfirmasi Kata Sandi
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          //   type={showConfirmPassword ? "text" : "password"}
                          placeholder="Konfirmasi Kata Sandi"
                          className="pl-10 pr-10 h-11 border-slate-200 focus:border-green-500 focus:ring-green-500"
                          {...field}
                        />
                        <button
                          type="button"
                          //   onClick={() =>
                          //     setShowConfirmPassword(!showConfirmPassword)
                          //   }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {/* {showConfirmPassword ? (
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
                className="w-full h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium transition-all duration-200"
              >
                Buat Akun
              </Button>
            </form>
          </Form>

          {/* Switch to Login */}
          {/* {onSwitchToLogin && (
            <div className="text-center">
              <span className="text-sm text-slate-600">
                Already have an account?{" "}
              </span>
              <Button
                variant="link"
                onClick={onSwitchToLogin}
                className="px-0 text-sm text-green-600 hover:text-green-800 font-medium"
              >
                Sign in
              </Button>
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
