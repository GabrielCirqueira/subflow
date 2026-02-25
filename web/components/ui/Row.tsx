import { cn } from "@/utils/cn";
import type React from "react";

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Row = ({ children, className, ...props }: RowProps) => {
  return (
    <div className={cn("flex flex-row", className)} {...props}>
      {children}
    </div>
  );
};
