"use client";

import { useState } from "react";
import FarmerCard from "@/components/FarmerCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const ALL_CROPS = [
  {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    quantity: "50 lbs",
    price: 3.50,
    unit: "lb",
    isAuction: false,
    farmer: { name: "Green Valley Farm", location: "Sacramento, CA", rating: 4.9 }
  },
  {
    id: 2,
    name: "Premium Hass Avocados",
    quantity: "100 boxes",
    price: 45.00,
    unit: "box",
    isAuction: true,
    farmer: { name: "Sunny Side Orchards", location: "San Diego, CA", rating: 4.8 }
  },
  {
    id: 3,
    name: "Fresh Sweet Corn",
    quantity: "200 dozens",
    price: 5.00,
    unit: "dozen",
    isAuction: false,
    farmer: { name: "Midwest Harvest", location: "Des Moines, IA", rating: 4.7 }
  },
  {
    id: 4,
    name: "Golden Honeycrisp Apples",
    quantity: "500 lbs",
    price: 2.50,
    unit: "lb",
    isAuction: true,
    farmer: { name: "Autumn Breeze Orchards", location: "Wenatchee, WA", rating: 5.0 }
  },
  {
    id: 5,
    name: "White Button Mushrooms",
    quantity: "20 lbs",
    price: 6.00,
    unit: "lb",
    isAuction: false,
    farmer: { name: "Dark Earth Fungi", location: "Kennett Square, PA", rating: 4.6 }
  },
  {
    id: 6,
    name: "Organic Baby Spinach",
    quantity: "30 cases",
    price: 15.00,
    unit: "case",
    isAuction: false,
    farmer: { name: "Verdant Fields", location: "Salinas, CA", rating: 4.8 }
  }
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCrops = ALL_CROPS.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crop.farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-brand-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-brand-dark">Fresh Marketplace</h1>
            <p className="text-gray-600 mt-2">Browse the best crops from our verified local farmers.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-grow md:w-80">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="Search crops or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-2xl text-brand-dark font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <SlidersHorizontal size={20} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {["All Crops", "Vegetables", "Fruits", "Grains", "Dairy", "Live Auctions"].map((cat, idx) => (
            <button
              key={cat}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-colors ${
                idx === 0 ? "bg-brand-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-brand-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrops.map((crop) => (
            <FarmerCard key={crop.id} crop={crop} />
          ))}
        </div>
        
        {filteredCrops.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No crops found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
