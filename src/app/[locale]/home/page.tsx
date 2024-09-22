import { Metadata } from "next";

import { HomeView } from "@/sections/home/view";

export const metadata: Metadata = {
  title: "Barq Daily | Home",
};

export default function Page() {
  return <HomeView />;
}
