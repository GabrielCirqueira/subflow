import { cn } from "@/utils/cn";
import type React from "react";

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Col = ({ children, className, ...props }: ColProps) => {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
};
