import { cn } from "@/utils/cn";
import type React from "react";

interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> { }

export const Spacer = ({ className, ...props }: SpacerProps) => {
  return <div className={cn("flex-1", className)} {...props} />;
};
