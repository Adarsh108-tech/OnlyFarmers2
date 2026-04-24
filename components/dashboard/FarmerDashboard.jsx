"use client";

import { motion } from "framer-motion";
import { DollarSign, Package, Gavel, Star, Plus, TrendingUp } from "lucide-react";

const STATS = [
  { title: "Total Revenue", value: "$12,450", change: "+15%", icon: <DollarSign size={24} />, color: "bg-green-100 text-green-600" },
  { title: "Active Listings", value: "24", change: "+4", icon: <Package size={24} />, color: "bg-blue-100 text-blue-600" },
  { title: "Ongoing Auctions", value: "3", change: "1 ending soon", icon: <Gavel size={24} />, color: "bg-orange-100 text-orange-600" },
  { title: "Seller Rating", value: "4.9", change: "120 reviews", icon: <Star size={24} />, color: "bg-yellow-100 text-yellow-600" },
];

const RECENT_ORDERS = [
  { id: "#ORD-092", item: "Organic Heirloom Tomatoes", buyer: "FreshMart Local", amount: "$350.00", status: "Delivered" },
  { id: "#ORD-091", item: "Premium Hass Avocados", buyer: "Sarah Jenkins", amount: "$45.00", status: "In Transit" },
];

const CROP_REQUESTS = [
  { id: 1, item: "Golden Honeycrisp Apples", interested: 5, currentOffer: "$3.00/lb" },
  { id: 2, item: "White Button Mushrooms", interested: 3, currentOffer: "$6.50/lb" },
];

export default function FarmerDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Bar Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm">Here's what's happening with your farm today.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-brand-primary/20 transition-all">
          <Plus size={18} />
          Add New Crop
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-black text-brand-dark">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Crop Requests (Multiple Buyers) */}
          <div className="bg-white rounded-2xl border border-brand-primary/20 shadow-sm p-6 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary"></div>
             <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">High Demand Crops</h3>
                  <p className="text-sm text-gray-500">Multiple buyers are interested. Consider holding an auction to maximize value.</p>
                </div>
             </div>
             
             <div className="space-y-4">
               {CROP_REQUESTS.map((req) => (
                 <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 gap-4">
                    <div>
                      <h4 className="font-bold text-brand-dark">{req.item}</h4>
                      <p className="text-sm text-brand-primary font-semibold flex items-center gap-1 mt-1">
                        🔥 {req.interested} buyers interested right now
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500">Highest Offer</p>
                        <p className="font-bold text-gray-800">{req.currentOffer}</p>
                      </div>
                      <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold shadow-md shadow-orange-500/20 transition-all text-sm whitespace-nowrap">
                        <Gavel size={16} />
                        Hold Auction
                      </button>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-brand-dark">Recent Orders</h3>
              <button className="text-brand-primary text-sm font-bold hover:underline">View All</button>
            </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-100">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Item</th>
                  <th className="pb-3 font-medium">Buyer</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold text-brand-dark">{order.id}</td>
                    <td className="py-4">{order.item}</td>
                    <td className="py-4">{order.buyer}</td>
                    <td className="py-4 font-bold">{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
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

        {/* Live Auctions Widget */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <Gavel size={20} className="text-orange-500" />
              Live Auctions
            </h3>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map((auction) => (
              <div key={auction} className="p-4 rounded-xl border border-orange-100 bg-orange-50/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800">Premium Hass Avocados</h4>
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full animate-pulse">Live</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Current Highest Bid</p>
                    <p className="text-xl font-black text-brand-dark">$45.00</p>
                  </div>
                  <div className="text-right">
                     <p className="text-xs text-gray-500 mb-1">Ends in</p>
                     <p className="font-bold text-gray-700">04:23</p>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors mt-2">
              View All Auctions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
