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
  title: "GetFluxly - Customer Lifecycle Platform for Modern SaaS",
  description:
    "Dev-friendly, all-in-one customer lifecycle platform: track user behaviour, build segments, send automated messages, and monitor deliverability without vendor lock.",
  keywords: [
    "customer lifecycle platform",
    "product analytics",
    "user behavior tracking",
    "segmentation",
    "lifecycle messaging",
    "deliverability monitoring",
    "dev friendly",
    "SaaS growth",
    "automation",
    "email infrastructure",
  ],
  openGraph: {
    title: "GetFluxly — Customer Lifecycle Platform",
    description:
      "Analytics, segmentation, messaging, and deliverability in one unified, dev-friendly platform for modern SaaS teams.",
    url: "https://getfluxly.com",
    siteName: "GetFluxly",
    type: "article",
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
