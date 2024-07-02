import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import MainImage from "@/components/ui/MainImage";

const inter = Inter({ subsets: ["latin"] });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/hiShop.svg" sizes="any" />
      </head>
      <body className={robotoCondensed.className}>
        <div className="z-10">
          <Navbar />
        </div>
        <div>
          <MainImage />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
