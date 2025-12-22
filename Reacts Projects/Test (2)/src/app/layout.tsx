/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXUS-STATS | Advanced GitHub Analytics",
  description:
    "Ultra-Advanced Professional GitHub Analytics Platform for AshrafMorningstar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
