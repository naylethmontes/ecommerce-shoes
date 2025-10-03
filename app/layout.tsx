
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader'
import WhatsappButton from "@/components/whatsappButton";


const urbanist = Urbanist({
  subsets: ["latin"],
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

          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD, 0 0 5px #2299DD"
          />
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
