import { cn } from "@/utils/cn";
import type React from "react";

interface VStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  spacing?: string | number;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
}

export const VStack = ({
  children,
  className,
  spacing = "4",
  justify = "start",
  align = "stretch",
  ...props
}: VStackProps) => {
  return (
    <div
      className={cn(
        "flex flex-col",
        `gap-${spacing}`,
        `justify-${justify}`,
        `items-${align}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
