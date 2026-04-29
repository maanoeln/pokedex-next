import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "National Pokédex — Browse all Pokémon",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23fff' stroke='%23222' stroke-width='4'/><path d='M2 50h96' stroke='%23222' stroke-width='4'/><path d='M50 2a48 48 0 0 1 0 96' fill='%23e53935'/><circle cx='50' cy='50' r='12' fill='%23fff' stroke='%23222' stroke-width='4'/><circle cx='50' cy='50' r='6' fill='%23222'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
