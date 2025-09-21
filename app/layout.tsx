import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courier = Courier_Prime({
  weight: ["400", "700"],
  variable: "--font-courier",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data Analyzer",
  description: "Powerful data analysis and visualization dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${courier.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
