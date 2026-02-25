import { cn } from "@/utils/cn";
import type React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  maxW?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Container = ({
  children,
  className,
  maxW = "xl",
  ...props
}: ContainerProps) => {
  const maxWidthClass = maxW === "full" ? "max-w-full" : `max-w-${maxW}`;

  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        maxWidthClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
