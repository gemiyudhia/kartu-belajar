"use client";

import z from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Lock, Mail } from "lucide-react";
import { Separator } from "../ui/separator";
import { signInSchema } from "@/lib/validations/signInSchema";
import { useSignInForm } from "@/hooks/useSignInForm";
import FormInput from "./FormInput";
import AuthCardWrapper from "../auth/AuthCardWrapper";
import SocialLoginButton from "../auth/SocialLoginButton";
import FormFooter from "../auth/FormFooter";

const SignInForm = () => {
  const form = useSignInForm();

  function onSubmit(values: z.infer<typeof signInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-[500px]">
      <AuthCardWrapper
        title="Selamat Datang Kembali!"
        description="Masuk ke akunmu dan lanjutkan belajar!"
      >
        <SocialLoginButton />
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="email"
              label="Email"
              control={form.control}
              placeholder="Masukan email"
              icon={<Mail className="w-4 h-4" />}
            />

            <FormInput
              name="password"
              label="Kata Sandi"
              control={form.control}
              placeholder="Masukan Kata Sandi"
              icon={<Lock className="w-4 h-4" />}
              toggleVisibility
              type="password"
            />

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 cursor-pointer"
            >
              Masuk
            </Button>
          </form>
        </Form>

        <FormFooter link="/signup" label="Daftar" title="Belum punya akun" />
      </AuthCardWrapper>
    </div>
  );
};

export default SignInForm;
