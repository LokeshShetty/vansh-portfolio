import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

// The only web font: Inter as one variable file (weight + optical size),
// latin only, self-hosted and preloaded by next/font. Headings use the
// opsz 32 cut, which is Inter Display; body text sizes itself automatically.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
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
    { media: "(prefers-color-scheme: light)", color: "#f5f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="progress" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
