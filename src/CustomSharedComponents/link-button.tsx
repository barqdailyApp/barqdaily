"use client";

import { useRouter } from "next/navigation";

import { Button, ButtonProps } from "@mui/material";

export default function ButtonLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & ButtonProps) {
  const router = useRouter();

  return (
    <Button
      {...props}
      onClick={() => router.push(href, { scroll: false })}
      role="link"
    >
      {children}
    </Button>
  );
}
