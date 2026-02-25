import { cn } from "@/utils/cn";
import type React from "react";

interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Center = ({ children, className, ...props }: CenterProps) => {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
};
