"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Activity, AlertTriangle, MoreVertical, ShieldCheck, Ban } from "lucide-react";

const STATS = [
  { title: "Total Users", value: "2,405", change: "+125 this week", icon: <Users size={24} />, color: "bg-blue-100 text-blue-600" },
  { title: "Platform Revenue", value: "$42,500", change: "+12%", icon: <DollarSign size={24} />, color: "bg-green-100 text-green-600" },
  { title: "Active Auctions", value: "148", change: "24 ending today", icon: <Activity size={24} />, color: "bg-purple-100 text-purple-600" },
  { title: "Pending Approvals", value: "12", change: "Requires action", icon: <AlertTriangle size={24} />, color: "bg-red-100 text-red-600" },
];

const RECENT_USERS = [
  { id: 1, name: "Sunset Farms", role: "Farmer", status: "Pending Verification", date: "2 mins ago" },
  { id: 2, name: "Michael Chen", role: "Buyer", status: "Active", date: "1 hour ago" },
  { id: 3, name: "Green Valley Co.", role: "Farmer", status: "Active", date: "3 hours ago" },
  { id: 4, name: "Elena Rodriguez", role: "Buyer", status: "Suspended", date: "1 day ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Bar Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Platform Overview</h2>
          <p className="text-gray-500 text-sm">Monitor platform health, users, and transactions.</p>
        </div>
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
              {stat.title === "Pending Approvals" && (
                <span className="relative flex h-3 w-3 mt-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-black text-brand-dark">{stat.value}</p>
              <p className="text-xs text-gray-500 mb-1">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-dark">Recent Signups & Activity</h3>
            <button className="text-brand-primary text-sm font-bold hover:underline">View All Users</button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-100">
                  <th className="pb-3 font-medium">User/Farm Name</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Joined</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {RECENT_USERS.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold text-brand-dark flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </td>
                    <td className="py-4 text-gray-600">{user.role}</td>
                    <td className="py-4 text-gray-500">{user.date}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.status === 'Active' ? 'bg-green-100 text-green-700' :
                        user.status === 'Suspended' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {user.status === 'Pending Verification' ? (
                        <button className="text-brand-primary hover:bg-brand-accent px-2 py-1 rounded transition-colors font-semibold flex items-center gap-1 ml-auto">
                          <ShieldCheck size={16} /> Approve
                        </button>
                      ) : (
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-500" />
              System Alerts
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-red-100 bg-red-50 text-red-800 text-sm">
              <strong className="block mb-1">Dispute Logged</strong>
              Order #ORD-089 reported for damaged goods upon delivery. Requires mediation.
              <button className="mt-2 text-red-600 font-bold hover:underline">Review Dispute</button>
            </div>
            
            <div className="p-4 rounded-xl border border-orange-100 bg-orange-50 text-orange-800 text-sm">
              <strong className="block mb-1">High Server Load</strong>
              API latency increased by 15% during peak auction closing times.
              <button className="mt-2 text-orange-600 font-bold hover:underline">View Logs</button>
            </div>
            
            <div className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors flex items-start gap-3">
              <Ban size={16} className="text-gray-400 mt-0.5" />
              <div className="text-sm">
                <p className="text-gray-800 font-medium">Suspicious Activity</p>
                <p className="text-gray-500 text-xs mt-0.5">Multiple failed logins from IP 192.168.x.x</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
