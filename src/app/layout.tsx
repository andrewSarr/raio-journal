import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raio-journal.vercel.app"),
  title: {
    default: "raio journal",
    template: "%s — raio journal",
  },
  description:
    "Notes from building raio, an open-source instant-payment foundation in Rust for African rails and interoperability.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headerList = await headers();
  const lang = headerList.get("x-locale") === "fr" ? "fr" : "en";

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${plexMono.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
