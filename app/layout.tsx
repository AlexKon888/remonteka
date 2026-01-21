import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ремонтека - Платформа отслеживания ремонта",
  description: "Платформа для отслеживания процесса производства ремонта квартиры",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
