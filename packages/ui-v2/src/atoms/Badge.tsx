import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-xl px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-100 text-primary-700",
        secondary:
          "border-transparent bg-gray-100 text-gray-700",
        success:
          "border-transparent bg-success-50 text-success-700",
        warning:
          "border-transparent bg-warning-50 text-warning-700",
        error:
          "border-transparent bg-error-50 text-error-700",
        outline:
          "border border-gray-200 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };