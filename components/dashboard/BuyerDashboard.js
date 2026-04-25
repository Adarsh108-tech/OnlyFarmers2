"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag, Heart, Gavel, ArrowRight,
  Clock, Star, Zap, TrendingUp, ChevronRight,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { title: "Total Spent", value: "$4,250", change: "This month", icon: <ShoppingBag size={20} />, color: "bg-indigo-50 text-indigo-600", trend: "up" },
  { title: "Active Bids", value: "2", change: "1 High Bid", icon: <Gavel size={20} />, color: "bg-orange-50 text-orange-600", trend: "neutral" },
  { title: "Saved Farms", value: "14", change: "2 updates", icon: <Heart size={20} />, color: "bg-rose-50 text-rose-600", trend: "up" },
];

const WATCHLIST = [
  { id: 1, name: "Premium Hass Avocados", farmer: "Sunny Side Orchards", price: "$45.00/box", img: "avocados", rating: 4.8 },
  { id: 2, name: "Organic Honeycrisp", farmer: "Autumn Breeze", price: "$2.50/lb", img: "apples", rating: 4.9 },
  { id: 3, name: "Baby Spinach", farmer: "Green Valley", price: "$3.20/kg", img: "spinach", rating: 4.7 },
];

export default function BuyerDashboard() {
  return (
    <div className="space-y-10 pb-12">
      {/* Hero Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Buyer Overview</h2>
          <p className="text-slate-500 font-medium mt-1">Ready to source the freshest produce today?</p>
        </div>
        <Link
          href="/marketplace"
          className="group flex items-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white px-7 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-900/10 transition-all active:scale-95"
        >
          <Zap size={18} className="text-yellow-400 fill-yellow-400" />
          <span>Browse Marketplace</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
            className="relative overflow-hidden bg-white p-7 rounded-3xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{stat.title}</h3>
            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
            {/* Subtle background decorative element */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Bids Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Gavel size={22} className="text-orange-500" />
              Live Bidding Activity
            </h3>
            <span className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">Auction Rules</span>
          </div>

          <div className="grid gap-4">
            {/* Winning Bid Card */}
            <div className="group relative bg-white rounded-3xl border-2 border-indigo-600 p-6 shadow-xl shadow-indigo-900/5 overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-tighter">
                Leading
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden relative shadow-md">
                  <Image src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=200" alt="Avocados" fill className="object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg font-black text-slate-900">Hass Avocados (100 boxes)</h4>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse">
                      <Star size={12} fill="currentColor" /> Highest Bidder
                    </div>
                    <span className="text-xs text-slate-400 font-medium">• Sunny Side Orchards</span>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Your Bid</p>
                      <p className="text-2xl font-black text-slate-900">$55.00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1 justify-end">
                        <Clock size={10} /> Time Left
                      </p>
                      <p className="text-lg font-bold text-rose-500">04:23:12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Outbid Card */}
            <div className="group bg-slate-50/50 rounded-3xl border border-slate-200 p-6 hover:bg-white hover:border-orange-200 transition-all">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
                  <Image src="https://images.unsplash.com/photo-1550081699-79c1c2e48a77?auto=format&fit=crop&q=80&w=200" alt="Corn" fill className="object-cover" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-700">Sweet Corn (50 dozen)</h4>
                      <p className="text-xs text-rose-500 font-bold mt-1 flex items-center gap-1">
                        <TrendingUp size={12} /> Outbid by $5.00
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 line-through font-bold">$12.00</p>
                      <p className="text-lg font-black text-slate-900">$17.00</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-white border border-orange-500 text-orange-600 hover:bg-orange-600 hover:text-white py-2 rounded-xl text-sm font-black transition-all">
                    Raise Bid to $20.00
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Watchlist Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Heart size={22} className="text-rose-500" />
              Watchlist
            </h3>
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {WATCHLIST.map((item) => (
                <div key={item.id} className="group p-5 hover:bg-slate-50 transition-all cursor-pointer">
                  <div className="flex gap-5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden relative flex-shrink-0">
                      <Image
                        src={`https://images.unsplash.com/photo-1543158266-0066955047b1?auto=format&fit=crop&q=80&w=200`}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.name}</h4>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">{item.farmer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900">{item.price}</p>
                          <div className="flex items-center gap-1 justify-end mt-1 text-amber-500">
                            <Star size={10} fill="currentColor" />
                            <span className="text-[10px] font-bold">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="text-[10px] font-black uppercase tracking-tighter text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                          Buy Now
                        </button>
                        <button className="text-[10px] font-black uppercase tracking-tighter text-slate-400 hover:text-rose-500">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-slate-900 transition-colors">
              View 12 More Items
            </button>
          </div>

          {/* Verification Badge Tip */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-900/20">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <ShieldCheck size={24} className="text-indigo-100" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-indigo-200">Buyer Protection</h4>
                <p className="text-sm font-medium mt-1 leading-relaxed text-indigo-50">
                  All farms on our platform are <span className="text-white underline">GlobalGAP certified</span>. Your purchase is protected until it reaches your warehouse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}