"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import z from "zod";
import { Lock, Mail, User } from "lucide-react";
import { Separator } from "../ui/separator";
import FormInput from "./FormInput";
import { signUpSchema } from "@/lib/validations/signUpSchema";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import AuthCardWrapper from "../auth/AuthCardWrapper";
import SocialLoginButton from "../auth/SocialLoginButton";
import FormFooter from "../auth/FormFooter";

const SignUpForm = () => {
  const form = useSignUpForm();

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-[500px]">
      <AuthCardWrapper
        title="Buat Akun"
        description="Yuk, daftar dan mulai belajarmu!"
      >
        <SocialLoginButton />
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="fullname"
              label="Nama Lengkap"
              placeholder="Masukan Nama Lengkap"
              control={form.control}
              icon={<User className="w-4 h-4" />}
            />

            <FormInput
              name="email"
              label="Email"
              placeholder="Masukan Email"
              control={form.control}
              icon={<Mail className="w-4 h-4" />}
            />

            <FormInput
              name="password"
              label="Kata Sandi"
              placeholder="Masukan Password"
              control={form.control}
              icon={<Lock className="w-4 h-4" />}
              toggleVisibility
              type="password"
            />

            <FormInput
              name="confirmPassword"
              label="Konfirmasi Password"
              placeholder="Konfirmasi Password"
              control={form.control}
              icon={<Lock className="w-4 h-4" />}
              toggleVisibility
              type="password"
            />

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 cursor-pointer"
            >
              Buat Akun
            </Button>
          </form>
        </Form>

        <FormFooter title="Sudah punya akun?" label="Masuk" link="/signin" />
      </AuthCardWrapper>
    </div>
  );
};

export default SignUpForm;
