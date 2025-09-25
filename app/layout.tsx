import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import ToastProvider from "@/provider/ToastProvider";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          <NextTopLoader showSpinner={false} color="var(--color-primary)" />
          <Header />
          <ToastProvider>{children}</ToastProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
