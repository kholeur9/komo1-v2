//import { cn } from '@/lib/utils';
import clsx from 'clsx';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuyDeo App",
  description: "L'application web de vente en ligne par vidéos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={clsx(inter.className, 'h-full')}>
        {children}
      </body>
    </html>
  );
}
