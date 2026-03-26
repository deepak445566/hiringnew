import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


import { Parkinsans } from 'next/font/google'

const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-parkinsans',
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO Optimized Metadata
export const metadata = {
  title: {
    default: "ZHS Hiring Solutions | Recruitment Company in India",
    template: "%s | ZHS Hiring Solutions",
  },
  description:
    "ZHS Hiring Solutions is a leading recruitment and staffing company in India providing IT & non-IT hiring, HR consulting, and workforce solutions.",
  
  keywords: [
    "recruitment company",
    "hiring company India",
    "staffing solutions",
    "IT recruitment",
    "HR consultancy",
    "jobs in India",
  ],

  authors: [{ name: "ZHS Hiring Solutions" }],
  creator: "ZHS Hiring Solutions",

  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "ZHS Hiring Solutions",
    description:
      "Top recruitment company for IT & non-IT hiring services in India.",
    url: "https://yourdomain.com",
    siteName: "ZHS Hiring Solutions",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}