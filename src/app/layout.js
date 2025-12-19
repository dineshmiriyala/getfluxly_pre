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
  metadataBase: new URL("https://www.getfluxly.com"),
  title: "GetFluxly - Product Analytics + Lifecycle Email on Your Own SMTP",
  description:
    "Paste a few lines of code to capture product analytics, event tracking, and unified customer profiles, then send lifecycle email through SES, Mailgun, SMTP2GO, or your own SMTP — no vendor lock.",
  keywords: [
    "analytics",
    "product analytics",
    "web analytics",
    "event tracking",
    "JS SDK",
    "HTTP API",
    "customer profiles",
    "customer data platform",
    "CDP",
    "lifecycle email",
    "email automation",
    "email deliverability",
    "transactional email",
    "SMTP",
    "SES",
    "Mailgun",
    "SMTP2GO",
    "developer friendly",
    "SaaS growth",
    "customer lifecycle",
    "behavioral segmentation",
    "server-side tracking",
    "automation",
    "email infrastructure",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "GetFluxly — Product Analytics + Lifecycle Email",
    description:
      "JS SDK + HTTP event tracking, unified customer profiles, and lifecycle email that runs on SES, Mailgun, SMTP2GO, or any SMTP you already use.",
    url: "https://www.getfluxly.com",
    siteName: "GetFluxly",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetFluxly — Product Analytics + Lifecycle Email",
    description:
      "JS SDK + HTTP event tracking, unified customer profiles, and lifecycle email that runs on your own SMTP provider.",
    images: ["/opengraph-image"],
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
          strategy="lazyOnload"
        />
        <Script id="ga4-gtag" strategy="lazyOnload">
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
