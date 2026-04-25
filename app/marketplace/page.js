"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, Store, LayoutGrid, Globe } from "lucide-react";

// Translations
const translations = {
  en: {
    title: "Marketplace",
    subtitle: "Explore Available Products. Find fresh produce, quality grains, and livestock directly from farmers.",
    searchPlaceholder: "Search products, farmers, locations...",
    noProducts: "No products found",
    tryAdjusting: "Try adjusting your category or search filters.",
    clearFilters: "Clear filters",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
    newestFirst: "Newest First",
    categories: {
      "All": "All",
      "Grains": "Grains",
      "Vegetables": "Vegetables",
      "Fruits": "Fruits",
      "Livestock": "Livestock"
    }
  },
  hi: {
    title: "बाज़ार",
    subtitle: "उपलब्ध उत्पादों का अन्वेषण करें। किसानों से सीधे ताजे उत्पाद, गुणवत्ता वाले अनाज और पशुधन खोजें।",
    searchPlaceholder: "उत्पाद, किसान, स्थान खोजें...",
    noProducts: "कोई उत्पाद नहीं मिला",
    tryAdjusting: "अपनी श्रेणी या खोज फ़िल्टर को समायोजित करने का प्रयास करें।",
    clearFilters: "फ़िल्टर साफ़ करें",
    priceLowHigh: "कीमत: कम से ज्यादा",
    priceHighLow: "कीमत: ज्यादा से कम",
    newestFirst: "सबसे नए",
    categories: {
      "All": "सभी",
      "Grains": "अनाज",
      "Vegetables": "सब्जियां",
      "Fruits": "फल",
      "Livestock": "पशुधन"
    }
  }
};

const COMMON_TRANSLATIONS = {
  en: {
    price: "Price",
    quantity: "Quantity",
    location: "Location",
    farmer: "Farmer",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    comingSoon: "Coming Soon",
    viewDetails: "View Details",
    available: "Available",
    badges: {
      "Organic": "Organic",
      "High Demand": "High Demand",
      "Fresh": "Fresh"
    }
  },
  hi: {
    price: "कीमत",
    quantity: "मात्रा",
    location: "स्थान",
    farmer: "किसान",
    inStock: "स्टॉक में",
    outOfStock: "स्टॉक से बाहर",
    comingSoon: "जल्द आ रहा है",
    viewDetails: "विवरण देखें",
    available: "उपलब्ध",
    badges: {
      "Organic": "जैविक",
      "High Demand": "भारी मांग",
      "Fresh": "ताज़ा"
    }
  }
};

// Mock Data
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Premium Sharbati Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop",
    farmerName: "Rajesh Kumar",
    location: "Punjab, India",
    quantityAvailable: "5000",
    price: 30,
    unit: "kg",
    category: "Grains",
    inStock: true,
    badges: ["Organic", "High Demand"],
    dateAdded: "2024-05-10T00:00:00Z"
  },
  {
    id: "2",
    name: "Fresh Red Onions",
    image: "https://images.unsplash.com/photo-1615484477201-9f4953330cb1?q=80&w=800&auto=format&fit=crop",
    farmerName: "Suresh Patil",
    location: "Nashik, Maharashtra",
    quantityAvailable: "2000",
    price: 25,
    unit: "kg",
    category: "Vegetables",
    inStock: true,
    badges: ["Fresh"],
    dateAdded: "2024-05-15T00:00:00Z"
  },
  {
    id: "3",
    name: "Gir Cow (Milking)",
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop",
    farmerName: "Bhaiya Lal",
    location: "Gujarat, India",
    quantityAvailable: "2",
    price: 65000,
    unit: "item",
    category: "Livestock",
    inStock: true,
    badges: ["High Demand"],
    dateAdded: "2024-05-12T00:00:00Z"
  },
  {
    id: "4",
    name: "Kashmiri Apples",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6e?q=80&w=800&auto=format&fit=crop",
    farmerName: "Tariq Ahmed",
    location: "Srinagar, J&K",
    quantityAvailable: "0",
    price: 150,
    unit: "kg",
    category: "Fruits",
    inStock: false,
    badges: ["Fresh", "Organic"],
    dateAdded: "2024-05-01T00:00:00Z"
  },
  {
    id: "5",
    name: "Basmati Rice (Export Quality)",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
    farmerName: "Gurpreet Singh",
    location: "Haryana, India",
    quantityAvailable: "10000",
    price: 80,
    unit: "kg",
    category: "Grains",
    inStock: true,
    badges: [],
    dateAdded: "2024-05-18T00:00:00Z"
  },
  {
    id: "6",
    name: "Farm Fresh Tomatoes",
    image: "https://images.unsplash.com/photo-1587049352841-8d4e8946ca1f?q=80&w=800&auto=format&fit=crop",
    farmerName: "Raju Reddy",
    location: "Andhra Pradesh",
    quantityAvailable: "1500",
    price: 20,
    unit: "kg",
    category: "Vegetables",
    inStock: true,
    badges: ["Fresh"],
    dateAdded: "2024-05-19T00:00:00Z"
  },
  {
    id: "7",
    name: "Desi Goats",
    image: "https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?q=80&w=800&auto=format&fit=crop",
    farmerName: "Ali Hasan",
    location: "Rajasthan, India",
    quantityAvailable: "15",
    price: 8500,
    unit: "item",
    category: "Livestock",
    inStock: true,
    badges: [],
    dateAdded: "2024-05-14T00:00:00Z"
  },
  {
    id: "8",
    name: "Alphonso Mangoes",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop",
    farmerName: "Prakash Desai",
    location: "Ratnagiri, Maharashtra",
    quantityAvailable: "500",
    price: 800,
    unit: "dozen",
    category: "Fruits",
    inStock: true,
    badges: ["Fresh", "High Demand"],
    dateAdded: "2024-05-20T00:00:00Z"
  }
];

const CATEGORIES = ["All", "Grains", "Vegetables", "Fruits", "Livestock"];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [lang, setLang] = useState("en");

  // Load language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang && (savedLang === "en" || savedLang === "hi")) {
      setLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  const t = translations[lang];
  const cardT = COMMON_TRANSLATIONS[lang];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.farmerName.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "price_asc") {
        return a.price - b.price;
      } else if (sortBy === "price_desc") {
        return b.price - a.price;
      } else if (sortBy === "newest") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      return 0;
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8fcf8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Language Switcher */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <Globe className="w-4 h-4 text-gray-500 ml-2 mr-1" />
            {["en", "hi"].map((langKey) => (
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
              <div className="bg-green-100 p-2 rounded-xl">
                <Store className="w-6 h-6 text-green-700" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{t.title}</h1>
            </div>
            <p className="text-gray-600 max-w-2xl text-sm md:text-base">
              {t.subtitle}
            </p>
          </div>

          {/* Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:min-w-[280px]">
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
                className="block w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors shadow-sm appearance-none cursor-pointer text-gray-700 font-medium"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">{t.newestFirst}</option>
                <option value="price_asc">{t.priceLowHigh}</option>
                <option value="price_desc">{t.priceHighLow}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-hidden relative">
          <div className="flex overflow-x-auto pb-4 -mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 shadow-sm border ${
                  selectedCategory === category
                    ? "bg-green-700 text-white border-green-700 ring-2 ring-green-700 ring-offset-2"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:border-green-200 hover:text-green-700"
                }`}
              >
                {t.categories[category] || category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} t={cardT} tCats={t.categories} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <LayoutGrid className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">{t.noProducts}</h3>
            <p className="mt-1 text-gray-500">{t.tryAdjusting}</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 text-sm font-medium text-green-600 hover:text-green-500 bg-green-50 px-5 py-2.5 rounded-lg transition-colors inline-block"
            >
              {t.clearFilters}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
