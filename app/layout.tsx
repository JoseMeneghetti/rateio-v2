import Header from "@/components/header/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import StoreProvider from "@/store/provider-component";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rateio",
  description: "Digital Slipt do seu Role!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
