import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Only Farmers | Premium Agricultural Marketplace",
  description: "Direct from farm to your table. A premium marketplace and auction platform for fresh produce.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-brand-bg text-gray-900 min-h-screen flex flex-col`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
