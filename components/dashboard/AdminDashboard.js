"use client";

import { motion } from "framer-motion";
import {
  Users, DollarSign, Activity, AlertTriangle,
  MoreVertical, ShieldCheck, Ban, ArrowUpRight,
  TrendingUp, Globe, ShieldAlert, CheckCircle2,
  Filter, Search
} from "lucide-react";

const STATS = [
  { title: "Total Users", value: "2,405", change: "+125", label: "this week", icon: <Users size={20} />, color: "bg-blue-50 text-blue-600" },
  { title: "Platform Revenue", value: "$42,500", change: "+12%", label: "vs last month", icon: <DollarSign size={20} />, color: "bg-emerald-50 text-emerald-600" },
  { title: "Active Auctions", value: "148", change: "24", label: "closing today", icon: <Activity size={20} />, color: "bg-indigo-50 text-indigo-600" },
  { title: "Critical Alerts", value: "12", change: "Action required", label: "", icon: <AlertTriangle size={20} />, color: "bg-rose-50 text-rose-600" },
];

const RECENT_USERS = [
  { id: 1, name: "Sunset Farms", email: "contact@sunset.farm", role: "Farmer", status: "Pending", date: "2m ago" },
  { id: 2, name: "Michael Chen", email: "m.chen@buyer.com", role: "Buyer", status: "Active", date: "1h ago" },
  { id: 3, name: "Green Valley Co.", email: "ops@greenvalley.ag", role: "Farmer", status: "Active", date: "3h ago" },
  { id: 4, name: "Elena Rodriguez", email: "elena.r@gmail.com", role: "Buyer", status: "Suspended", date: "1d ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10 pb-12 font-sans">
      {/* Top Bar / Command Center Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Platform Control</h2>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Systems Nominal
            </div>
          </div>
          <p className="text-slate-500 font-medium">Global oversight of marketplace health and security.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={stat.title}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all"
          >
            <div className="flex justify-between items-center mb-6">
              <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-widest leading-none">
                  Metric
                </p>
                <div className={`mt-1 flex items-center justify-end gap-1 text-[11px] font-black ${stat.title === 'Critical Alerts' ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Moderation Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-7 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-10">
            <div>
              <h3 className="text-lg font-black text-slate-900">User Moderation Queue</h3>
              <p className="text-xs text-slate-400 font-bold mt-0.5 uppercase tracking-widest">Awaiting verification or review</p>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Find user..."
                className="bg-slate-100 border-none text-xs px-10 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 w-48 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto flex-1 px-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-50">
                  <th className="px-4 py-5 font-black">Identity</th>
                  <th className="px-4 py-5 font-black">Classification</th>
                  <th className="px-4 py-5 font-black">Activity</th>
                  <th className="px-4 py-5 font-black text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {RECENT_USERS.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-all">
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-black shadow-sm group-hover:from-indigo-500 group-hover:to-indigo-600 group-hover:text-white transition-all">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-1.5">
                        <Globe size={12} className="text-slate-300" />
                        <span className="text-xs font-bold text-slate-600">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' :
                            user.status === 'Suspended' ? 'bg-rose-500' : 'bg-orange-500'
                          }`} />
                        <span className="text-xs font-bold text-slate-700">{user.status}</span>
                        <span className="text-[10px] text-slate-400">• {user.date}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-right">
                      {user.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Reject">
                            <Ban size={16} />
                          </button>
                          <button className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-black transition-all">
                            <ShieldCheck size={14} /> Verify
                          </button>
                        </div>
                      ) : (
                        <button className="text-slate-300 hover:text-slate-600 p-2 rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="py-4 border-t border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 hover:bg-indigo-50 transition-all">
            Load More Users
          </button>
        </div>

        {/* System Health & Infrastructure */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl -mr-16 -mt-16 rounded-full" />

            <h3 className="text-lg font-black flex items-center gap-2 mb-6 relative z-10">
              <ShieldAlert className="text-indigo-400" />
              Critical Alerts
            </h3>

            <div className="space-y-4 relative z-10">
              <div className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-tighter bg-rose-400/10 px-2 py-0.5 rounded">High Severity</span>
                  <span className="text-[10px] text-white/40">2h ago</span>
                </div>
                <p className="text-sm font-bold text-white mb-1">Dispute Logged: #ORD-089</p>
                <p className="text-xs text-white/60 leading-relaxed mb-3">Damaged goods reported by WholeFoods Market. Needs manual review.</p>
                <button className="w-full py-2 bg-white text-slate-900 rounded-xl text-xs font-black hover:bg-indigo-400 hover:text-white transition-all">
                  Open Mediation Hub
                </button>
              </div>

              <div className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-orange-400 uppercase tracking-tighter bg-orange-400/10 px-2 py-0.5 rounded">Resource Warning</span>
                </div>
                <p className="text-sm font-bold text-white mb-1">Database Latency Spike</p>
                <p className="text-xs text-white/60 leading-relaxed">API performance decreased by 15% during peak auction hours.</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="bg-orange-400 h-full" />
                  </div>
                  <span className="text-[10px] font-bold text-orange-400">85% load</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick System Stats */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Infrastructure Status</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">API Servers</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">99.9% Uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">Payment Gateway</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Operational</span>
              </div>
              <button className="w-full py-3 mt-2 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-xs font-black uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-600 transition-all">
                Run Full Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}