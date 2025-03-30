import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "./components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//todo: change description...
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`h-screen flex ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SideBar></SideBar>

        <main className="flex justify-center xl:items-center w-full text-coral py-12 overflow-y-auto h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
