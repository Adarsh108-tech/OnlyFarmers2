"use client";

import { motion } from "framer-motion";
import { Search, Package, ChevronRight, MapPin, Calendar, Receipt } from "lucide-react";

const ORDERS = [
  { id: "ORD-9432", date: "Oct 24, 2026", items: "Premium Hass Avocados (100 boxes)", farmer: "Sunny Side Orchards", total: "$4,500.00", status: "In Transit" },
  { id: "ORD-9431", date: "Oct 22, 2026", items: "Organic Honeycrisp Apples (50 lbs)", farmer: "Autumn Breeze Farms", total: "$125.00", status: "Delivered" },
  { id: "ORD-9428", date: "Oct 15, 2026", items: "Heirloom Tomatoes (200 lbs)", farmer: "Green Valley Organics", total: "$700.00", status: "Delivered" },
  { id: "ORD-9425", date: "Oct 02, 2026", items: "Sweet Corn (500 dozen)", farmer: "Midwest Harvest", total: "$2,500.00", status: "Processing" },
];

export default function BuyerOrdersPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Order History</h2>
          <p className="text-gray-500 text-sm">View and track all your past and current orders.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-primary text-brand-dark px-4 py-2 rounded-xl font-bold shadow-sm transition-all">
          <Receipt size={18} />
          Download Invoices
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by order ID or farmer..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {["All Orders", "Processing", "In Transit", "Delivered"].map((tab, idx) => (
            <button key={tab} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${idx === 0 ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {ORDERS.map((order, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={order.id} 
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Order Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-brand-accent/20 text-brand-primary rounded-xl mt-1">
                  <Package size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-black text-brand-dark">{order.id}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="font-medium text-gray-800 mb-2">{order.items}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {order.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {order.farmer}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Actions/Price */}
              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 gap-4">
                <div className="text-left md:text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-xl font-black text-brand-dark">{order.total}</p>
                </div>
                <button className="flex items-center gap-1 text-sm font-bold text-brand-primary hover:text-brand-dark transition-colors">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
