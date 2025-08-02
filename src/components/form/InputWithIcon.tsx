"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  toggleVisibility?: boolean;
}

const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, toggleVisibility, type, ...props }, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const inputType = toggleVisibility ? (visible ? "text" : "password") : type;

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4">
          {icon}
        </div>
        <Input
          ref={ref}
          type={inputType}
          placeholder="Masukan Kata Sandi"
          className="pl-10 pr-10 h-11 border-slate-200 focus:border-green-500 focus:ring-green-500"
          {...props}
        />
        {toggleVisibility && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            {visible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
