"use client";

import { View500 } from "@/sections/error";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Error page!",
};

export default function NotFoundPage({ error }: { error: Error }) {
  return <View500 error={error.message} />;
}
