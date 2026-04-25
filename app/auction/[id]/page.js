"use client";

import { useState, useMemo, useEffect } from "react";
import AuctionCard from "@/components/AuctionCard";
import { Search, SlidersHorizontal, Leaf, Globe } from "lucide-react";

// Translations
const translations = {
  en: {
    title: "Live Auctions",
    subtitle: "Bid on high-quality agricultural produce and livestock directly from verified farmers.",
    searchPlaceholder: "Search products, farmers...",
    endingSoon: "Ending Soon",
    newestFirst: "Newest First",
    highestBid: "Highest Bid",
    noAuctions: "No auctions found",
    tryAdjusting: "Try adjusting your search or filters.",
    basePrice: "Base Price",
    currentBid: "Current Bid",
    quantity: "Quantity",
    location: "Location",
    endsIn: "Ends in",
    startsIn: "Starts in",
    auctionEnded: "Auction Ended",
    statusLive: "LIVE",
    statusUpcoming: "UPCOMING",
    statusEnded: "ENDED",
    days: "d",
    hours: "h",
    minutes: "m",
    seconds: "s"
  },
  hi: {
    title: "लाइव नीलामी",
    subtitle: "सत्यापित किसानों से सीधे उच्च गुणवत्ता वाली कृषि उपज और पशुधन पर बोली लगाएं।",
    searchPlaceholder: "उत्पाद, किसान खोजें...",
    endingSoon: "जल्द समाप्त होने वाले",
    newestFirst: "सबसे नए",
    highestBid: "सबसे बड़ी बोली",
    noAuctions: "कोई नीलामी नहीं मिली",
    tryAdjusting: "अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें।",
    basePrice: "आधार मूल्य",
    currentBid: "वर्तमान बोली",
    quantity: "मात्रा",
    location: "स्थान",
    endsIn: "समाप्त होगा",
    startsIn: "शुरू होगा",
    auctionEnded: "नीलामी समाप्त",
    statusLive: "लाइव",
    statusUpcoming: "आगामी",
    statusEnded: "समाप्त",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड"
  }
};

// Mock Data
const MOCK_AUCTIONS = [
  {
    id: "1",
    productImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop",
    productName: "Premium Sharbati Wheat",
    farmerName: "Rajesh Kumar",
    location: "Punjab, India",
    quantity: "5000 kg",
    basePrice: 150000,
    currentBid: 165000,
    auctionStartTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Started 1 day ago
    auctionEndTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // Ends in 2 hours
  },
  {
    id: "2",
    productImage: "https://images.unsplash.com/photo-1615484477201-9f4953330cb1?q=80&w=800&auto=format&fit=crop",
    productName: "Organic Red Onions",
    farmerName: "Suresh Patil",
    location: "Nashik, Maharashtra",
    quantity: "2000 kg",
    basePrice: 40000,
    currentBid: 42500,
    auctionStartTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // Started 30 mins ago
    auctionEndTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // Ends in 2 days
  },
  {
    id: "3",
    productImage: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop",
    productName: "Gir Cow",
    farmerName: "Bhaiya Lal",
    location: "Gujarat, India",
    quantity: "1 Head",
    basePrice: 65000,
    currentBid: 65000,
    auctionStartTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Starts tomorrow
    auctionEndTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // Ends in 3 days
  },
  {
    id: "4",
    productImage: "https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?q=80&w=800&auto=format&fit=crop",
    productName: "Desi Goats (Batch of 5)",
    farmerName: "Ali Hasan",
    location: "Rajasthan, India",
    quantity: "5 Heads",
    basePrice: 35000,
    currentBid: 41000,
    auctionStartTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // Started 5 days ago
    auctionEndTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // Ended 2 hours ago
  },
  {
    id: "5",
    productImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
    productName: "Basmati Rice (Export Quality)",
    farmerName: "Gurpreet Singh",
    location: "Haryana, India",
    quantity: "10000 kg",
    basePrice: 800000,
    currentBid: 850000,
    auctionStartTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // Started 1 hour ago
    auctionEndTime: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // Ends in 45 mins
  },
  {
    id: "6",
    productImage: "https://images.unsplash.com/photo-1587049352841-8d4e8946ca1f?q=80&w=800&auto=format&fit=crop",
    productName: "Fresh Tomatoes",
    farmerName: "Raju Reddy",
    location: "Andhra Pradesh",
    quantity: "1500 kg",
    basePrice: 20000,
    currentBid: 24000,
    auctionStartTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), // Starts in 5 hours
    auctionEndTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Ends in 1 day
  }
];

export default function AuctionListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("ending_soon");
  const [lang, setLang] = useState("en");

  // Load preferred language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  const t = translations[lang];

  const filteredAndSortedAuctions = useMemo(() => {
    let result = [...MOCK_AUCTIONS];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (auction) =>
          auction.productName.toLowerCase().includes(query) ||
          auction.farmerName.toLowerCase().includes(query) ||
          auction.location.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const now = new Date().getTime();
      const aStart = new Date(a.auctionStartTime).getTime();
      const aEnd = new Date(a.auctionEndTime).getTime();
      const bStart = new Date(b.auctionStartTime).getTime();
      const bEnd = new Date(b.auctionEndTime).getTime();

      const getStatus = (start, end) => {
        if (now > end) return 2; // Ended
        if (now < start) return 1; // Upcoming
        return 0; // Live
      };

      const aStatus = getStatus(aStart, aEnd);
      const bStatus = getStatus(bStart, bEnd);

      if (sortBy === "ending_soon") {
        if (aStatus !== bStatus) return aStatus - bStatus; // Live (0) -> Upcoming (1) -> Ended (2)
        
        if (aStatus === 0) {
          // Both LIVE: Sort by closest end time
          return aEnd - bEnd;
        } else if (aStatus === 1) {
          // Both UPCOMING: Sort by closest start time
          return aStart - bStart;
        } else {
          // Both ENDED: Sort by most recently ended
          return bEnd - aEnd;
        }
      } else if (sortBy === "highest_bid") {
        return b.currentBid - a.currentBid;
      } else if (sortBy === "newest") {
        // Sort by closest start time generally (assuming newest means recently started/upcoming)
        return Math.abs(aStart - now) - Math.abs(bStart - now);
      }

      return 0;
    });

    return result;
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Language Switcher */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <Globe className="w-4 h-4 text-gray-500 ml-2 mr-1" />
            {Object.keys(translations).map((langKey) => (
              <button
                key={langKey}
                onClick={() => handleLanguageChange(langKey)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                  lang === langKey
                    ? "bg-green-100 text-green-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {langKey === "en" ? "EN" : "हिंदी"}
              </button>
            ))}
          </div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{t.title}</h1>
            </div>
            <p className="text-gray-500 max-w-2xl text-sm md:text-base">
              {t.subtitle}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:min-w-[250px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SlidersHorizontal className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors shadow-sm appearance-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="ending_soon">{t.endingSoon}</option>
                <option value="newest">{t.newestFirst}</option>
                <option value="highest_bid">{t.highestBid}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        {filteredAndSortedAuctions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} t={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Leaf className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">{t.noAuctions}</h3>
            <p className="mt-1 text-gray-500">{t.tryAdjusting}</p>
          </div>
        )}

      </div>
    </div>
  );
}
