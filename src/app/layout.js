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
  title: "GetFluxly - Analytics + Lifecycle Email on Your Own SMTP",
  description:
    "Paste a few lines of code to track web analytics, build unified profiles, and send lifecycle email through SES, Mailgun, SMTP2GO, or your own SMTP — no vendor lock.",
  keywords: [
    "analytics",
    "web analytics",
    "JS SDK",
    "HTTP API",
    "customer profiles",
    "lifecycle email",
    "SMTP",
    "SES",
    "Mailgun",
    "SMTP2GO",
    "developer friendly",
    "SaaS growth",
    "automation",
    "email infrastructure",
  ],
  openGraph: {
    title: "GetFluxly — Analytics + Messaging on Your Infra",
    description:
      "JS SDK + HTTP tracking, unified customer profiles, and lifecycle email that runs on SES, Mailgun, SMTP2GO, or any SMTP you already use.",
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
