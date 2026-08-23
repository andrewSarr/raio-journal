import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", fr: "/fr", "x-default": "/" },
  },
};

export default function Page() {
  return <HomeView locale="en" />;
}
