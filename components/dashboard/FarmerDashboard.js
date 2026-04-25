"use client";

import { motion } from "framer-motion";
import {
  DollarSign, Package, Gavel, Star, Plus,
  TrendingUp, Users, ArrowUpRight, Clock,
  ChevronRight
} from "lucide-react";

const STATS = [
  { title: "Total Revenue", value: "$12,450", change: "+15%", icon: <DollarSign size={20} />, color: "bg-emerald-50 text-emerald-600", trend: "up" },
  { title: "Active Listings", value: "24", change: "+4", icon: <Package size={20} />, color: "bg-blue-50 text-blue-600", trend: "up" },
  { title: "Ongoing Auctions", value: "3", change: "1 ending", icon: <Gavel size={20} />, color: "bg-orange-50 text-orange-600", trend: "neutral" },
  { title: "Seller Rating", value: "4.9", change: "120 reviews", icon: <Star size={20} />, color: "bg-amber-50 text-amber-600", trend: "up" },
];

const RECENT_ORDERS = [
  { id: "#ORD-092", item: "Organic Heirloom Tomatoes", buyer: "FreshMart Local", amount: "$350.00", status: "Delivered", date: "2h ago" },
  { id: "#ORD-091", item: "Premium Hass Avocados", buyer: "Sarah Jenkins", amount: "$45.00", status: "In Transit", date: "5h ago" },
  { id: "#ORD-090", item: "Sweet Corn Bulk", buyer: "Market Bistro", amount: "$1,200.00", status: "Pending", date: "1d ago" },
];

const CROP_REQUESTS = [
  { id: 1, item: "Golden Honeycrisp Apples", interested: 5, currentOffer: "$3.00/lb", trend: "+12%" },
  { id: 2, item: "White Button Mushrooms", interested: 3, currentOffer: "$6.50/lb", trend: "+5%" },
];

export default function FarmerDashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 font-medium">Welcome back! Here’s what’s happening with your crops.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
          <Plus size={20} />
          <span>Add New Crop</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.title}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all cursor-default"
          >
            <div className="flex justify-between items-center mb-5">
              <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-50'}`}>
                {stat.trend === 'up' && <TrendingUp size={12} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">{stat.title}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">

          {/* Actionable High Demand Card */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-emerald-400" />
                    High Demand Crops
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">Market prices are peaking for these items.</p>
                </div>
                <button className="text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  Market Analysis <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid gap-4">
                {CROP_REQUESTS.map((req) => (
                  <div key={req.id} className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                        {req.item.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{req.item}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Users size={12} /> {req.interested} active buyers
                          </span>
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter bg-emerald-500/10 px-2 py-0.5 rounded">
                            {req.trend} price spike
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors">
                      <Gavel size={14} />
                      Start Auction
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <button className="text-emerald-600 text-sm font-bold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">View All Orders</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Order Details</th>
                    <th className="px-6 py-4 font-bold">Buyer</th>
                    <th className="px-6 py-4 font-bold">Amount</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{order.item}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{order.id} • {order.date}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{order.buyer}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{order.amount}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500' :
                              order.status === 'In Transit' ? 'bg-blue-500' : 'bg-amber-500'
                            }`} />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Live Auctions Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                Live Auctions
              </h3>
              <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded-lg uppercase">3 Active</span>
            </div>

            <div className="space-y-4">
              {[1, 2].map((auction) => (
                <div key={auction} className="group p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:shadow-orange-900/5 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Premium Hass Avocados</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Lot #A24 - 200kg</p>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mb-1">Highest Bid</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tight">$45.00</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-orange-600 font-bold text-sm bg-orange-50 px-2 py-1 rounded-lg">
                        <Clock size={12} />
                        <span>04:23</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "65%" }}
                      className="bg-orange-500 h-full"
                    />
                  </div>
                </div>
              ))}

              <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-bold text-sm hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all mt-2">
                View All Auction Activity
              </button>
            </div>
          </div>

          {/* Quick Tip / News */}
          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-900/20">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-indigo-200 text-sm uppercase tracking-widest">
              Farmer Tip
            </h4>
            <p className="text-sm font-medium leading-relaxed">
              Wholesale demand for <span className="text-emerald-300 font-bold underline">Organic Kale</span> is expected to rise by 20% next week. Update your listings now!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}