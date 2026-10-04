import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

// The only web font: one weight, latin only, self-hosted and preloaded by
// next/font. Body text uses the system stack, which costs nothing to load.
const display = Instrument_Serif({
  variable: "--font-display-local",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name}, ${profile.role}`;
const description = profile.intro;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "profile" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={display.variable}>
      <body>{children}</body>
    </html>
  );
}
