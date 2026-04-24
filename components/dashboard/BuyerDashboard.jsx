"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Heart, Gavel, ArrowRight, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { title: "Total Spent", value: "$4,250", change: "This month", icon: <ShoppingBag size={24} />, color: "bg-blue-100 text-blue-600" },
  { title: "Active Bids", value: "2", change: "Highest bidder", icon: <Gavel size={24} />, color: "bg-orange-100 text-orange-600" },
  { title: "Saved Farms", value: "14", change: "2 new updates", icon: <Heart size={24} />, color: "bg-red-100 text-red-600" },
];

const WATCHLIST = [
  { id: 1, name: "Premium Hass Avocados", farmer: "Sunny Side Orchards", price: "$45.00/box", img: "avocados" },
  { id: 2, name: "Organic Honeycrisp", farmer: "Autumn Breeze", price: "$2.50/lb", img: "apples" },
];

export default function BuyerDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Bar Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Buyer Overview</h2>
          <p className="text-gray-500 text-sm">Track your orders, bids, and favorite farms.</p>
        </div>
        <Link href="/marketplace" className="flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-primary text-brand-dark px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all">
          Browse Marketplace
          <ArrowRight size={18} className="text-brand-primary" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.title} 
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-black text-brand-dark">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Bids */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Gavel size={20} className="text-brand-primary" />
              Your Active Bids
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-brand-primary/20 bg-brand-accent/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden relative">
                   <Image src="https://source.unsplash.com/800x600/?avocados" alt="Avocados" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">Hass Avocados (100 boxes)</h4>
                  <p className="text-xs text-brand-primary font-bold flex items-center gap-1 mt-1">
                    <Star size={12} fill="currentColor" /> You are the highest bidder
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-brand-dark">$55.00</p>
                <p className="text-xs text-red-500 font-bold flex items-center gap-1 justify-end mt-1">
                  <Clock size={12} /> 04:23 left
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden relative">
                   <Image src="https://source.unsplash.com/800x600/?corn" alt="Corn" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Sweet Corn (50 dozen)</h4>
                  <p className="text-xs text-red-500 font-bold mt-1">
                    Outbid by $5.00
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-500 line-through">$12.00</p>
                <button className="text-xs font-bold bg-orange-500 text-white px-3 py-1.5 rounded-lg mt-1 hover:bg-orange-600 transition-colors">
                  Increase Bid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Watchlist */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Heart size={20} className="text-red-500" />
              Watchlist
            </h3>
            <button className="text-brand-primary text-sm font-bold hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {WATCHLIST.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                    <Image src={`https://source.unsplash.com/800x600/?${item.img}`} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.farmer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-dark">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
