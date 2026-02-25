import { cn } from "@/utils/cn";
import type React from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
};
