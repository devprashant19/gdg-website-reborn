"use client";

import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/app/components/ui/button";

interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  href: string;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  title?: string;
}

export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  target,
  rel,
  title,
}: ButtonLinkProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href} target={target} rel={rel} title={title}>
        {children}
      </Link>
    </Button>
  );
}
