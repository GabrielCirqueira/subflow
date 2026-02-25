import { cn } from "@/utils/cn";
import type React from "react";

interface WrapProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  spacing?: string | number;
}

export const Wrap = ({
  children,
  className,
  spacing = "4",
  ...props
}: WrapProps) => {
  return (
    <div
      className={cn("flex flex-wrap", `gap-${spacing}`, className)}
      {...props}
    >
      {children}
    </div>
  );
};
