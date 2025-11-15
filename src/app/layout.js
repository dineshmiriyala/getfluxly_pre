import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Tracker from "@/app/components/Tracker.js";
import SeoSchema from "./seo-schema";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GetFluxly - Email Analytics for Marketing campaigns",
  description:
    "GetFluxly provides deep deliverability analytics, sending diagnostics, IP reputation insights, and powerful automation workflows for large/bulk marketers and builders, transactional emails.",
  openGraph: {
    title: "GetFluxly — Email Analytics Platform",
    description:
      "Deep deliverability insights, MX checks, and automation marketing emails.",
    url: "https://getfluxly.com",
    siteName: "GetFluxly",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <SeoSchema />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZH198LDZGQ"
          strategy="afterInteractive"
        />
        <Script id="ga4-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZH198LDZGQ');
          `}
        </Script>
        <Tracker />
        {children}
      </body>
    </html>
  );
}
