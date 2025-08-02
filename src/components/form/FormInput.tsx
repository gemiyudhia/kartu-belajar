"use client";

import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import InputWithIcon from "./InputWithIcon";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  icon: ReactNode;
  placeholder: string;
  toggleVisibility?: boolean;
  type?: string;
}

const FormInput = <T extends FieldValues>({
  control,
  icon,
  label,
  name,
  placeholder,
  toggleVisibility,
  type,
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-slate-700">
            {label}
          </FormLabel>
          <FormControl>
            <InputWithIcon
              icon={icon}
              toggleVisibility={toggleVisibility}
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
