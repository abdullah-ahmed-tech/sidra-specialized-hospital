import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidra Specialized Hospital",
  description: "Premium hospital website for services, doctors, departments, and appointments.",
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