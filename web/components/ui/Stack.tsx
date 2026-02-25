import { cn } from "@/utils/cn";
import type React from "react";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  spacing?: string | number;
}

export const Stack = ({
  children,
  className,
  spacing = "4",
  ...props
}: StackProps) => {
  return (
    <div
      className={cn("flex flex-col", `gap-${spacing}`, className)}
      {...props}
    >
      {children}
    </div>
  );
};
