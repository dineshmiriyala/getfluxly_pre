import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Tracker from "@/app/components/Tracker.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GetFluxly Waitlist",
  description: "All in one marketing email platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Tracker />
        {children}
      </body>
    </html>
  );
}
