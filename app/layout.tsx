import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Common/Header";
import NextTopLoader from "nextjs-toploader";
const roboto_Serif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hz phim",
  description: "Đỉnh cao phim ảnh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula" suppressHydrationWarning>
      <body className={`${roboto_Serif.variable} antialiased`}>
        <NextTopLoader showSpinner={false} color="var(--color-primary)" />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
