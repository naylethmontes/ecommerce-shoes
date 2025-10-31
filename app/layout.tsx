import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'sonner'

import WhatsappButton from "@/components/whatsappButton";


export const urbanist = Urbanist({
  subsets: ["latin"],
  variable: '--font-urbanist',
});


export const metadata: Metadata = {
  title: "Tienda ecommerce",
  description: "welcome to my ecommerce shoe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={urbanist.className}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Toaster />
          <WhatsappButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
