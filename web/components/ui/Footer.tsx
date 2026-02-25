import { cn } from "@/utils/cn";
import type React from "react";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Footer = ({ children, className, ...props }: FooterProps) => {
  return (
    <footer
      className={cn(
        "mt-auto border-t bg-background py-6",
        className
      )}
      {...props}
    >
      {children}
    </footer>
  );
};
