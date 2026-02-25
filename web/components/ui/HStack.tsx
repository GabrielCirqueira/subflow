import { cn } from "@/utils/cn";
import type React from "react";

interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  spacing?: string | number;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
}

export const HStack = ({
  children,
  className,
  spacing = "4",
  justify = "start",
  align = "center",
  ...props
}: HStackProps) => {
  return (
    <div
      className={cn(
        "flex flex-row",
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
