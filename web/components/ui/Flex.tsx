import { cn } from "@/utils/cn";
import type React from "react";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: string | number;
}

export const Flex = ({
  children,
  className,
  direction = "row",
  justify = "start",
  align = "stretch",
  wrap = "nowrap",
  gap,
  ...props
}: FlexProps) => {
  const gapClass = gap ? `gap-${gap}` : "";

  return (
    <div
      className={cn(
        "flex",
        `flex-${direction}`,
        `justify-${justify}`,
        `items-${align}`,
        `flex-${wrap}`,
        gapClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
