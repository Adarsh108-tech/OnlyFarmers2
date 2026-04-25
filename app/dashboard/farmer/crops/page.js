"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search, Filter, MoreVertical, Package } from "lucide-react";

const CROPS = [
  { id: 1, name: "Organic Honeycrisp Apples", category: "Fruits", price: "$2.50/lb", stock: "500 lbs", status: "Active" },
  { id: 2, name: "Premium Hass Avocados", category: "Vegetables", price: "$45.00/box", stock: "50 boxes", status: "Low Stock" },
  { id: 3, name: "Heirloom Tomatoes", category: "Vegetables", price: "$3.50/lb", stock: "200 lbs", status: "Active" },
  { id: 4, name: "Sweet Corn", category: "Grains", price: "$0.50/ear", stock: "Out of Stock", status: "Inactive" },
];

export default function FarmerCropsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">My Crops</h2>
          <p className="text-gray-500 text-sm">Manage your inventory and product listings.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-brand-primary/20 transition-all">
          <Plus size={18} />
          Add New Crop
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search crops..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-all w-full sm:w-auto">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Crops Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {CROPS.map((crop, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={crop.id} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden relative flex-shrink-0">
                        <div className="absolute inset-0 bg-brand-accent/20 flex items-center justify-center text-brand-primary">
                           <Package size={20} />
                        </div>
                      </div>
                      <span className="font-bold text-brand-dark">{crop.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{crop.category}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{crop.price}</td>
                  <td className="px-6 py-4 text-gray-600">{crop.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      crop.status === 'Active' ? 'bg-green-100 text-green-700' :
                      crop.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {crop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-accent/20 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {CROPS.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No crops found. Add your first crop to get started!
          </div>
        )}
      </div>
    </div>
  );
}
