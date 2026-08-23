import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "raio journal",
  description:
    "Décisions de conception, architecture, et avancement d'une fondation de paiement instantané open source en Rust — conçue pour les rails africains et l'interopérabilité.",
  alternates: {
    canonical: "/fr",
    languages: { en: "/", fr: "/fr", "x-default": "/" },
  },
};

export default function Page() {
  return <HomeView locale="fr" />;
}
