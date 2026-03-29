import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidra Admin Dashboard",
  description: "Operational dashboard for Sidra Specialized Hospital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}