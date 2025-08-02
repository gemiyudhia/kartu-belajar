import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AuthCardWrapperProps {
  children: ReactNode;
  title: string;
  description: string;
}

const AuthCardWrapper = ({
  children,
  description,
  title,
}: AuthCardWrapperProps) => {
  return (
    <Card className="shadow-xl border-0 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center pb-8">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
};

export default AuthCardWrapper;
