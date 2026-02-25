import { cn } from "@/utils/cn";
import type React from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  cols?: number;
  gap?: string | number;
}

export const Grid = ({
  children,
  className,
  cols = 1,
  gap = "4",
  ...props
}: GridProps) => {
  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${cols}`,
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
