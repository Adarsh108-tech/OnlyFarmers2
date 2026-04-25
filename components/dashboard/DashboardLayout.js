"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout, LayoutDashboard, ShoppingBag,
  Settings, LogOut, Menu, X, Bell,
  User, Tractor, ShieldAlert, ChevronRight,
  Search
} from "lucide-react";

export default function DashboardLayout({ children, role = "buyer" }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const roleConfig = {
    buyer: {
      title: "Buyer Portal",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      accent: "bg-indigo-600",
      icon: <User size={22} />,
      links: [
        { name: "Overview", href: "/dashboard/buyer", icon: <LayoutDashboard size={20} /> },
        { name: "My Orders", href: "/dashboard/buyer/orders", icon: <ShoppingBag size={20} /> },
      ]
    },
    farmer: {
      title: "Farmer Hub",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      accent: "bg-emerald-600",
      icon: <Tractor size={22} />,
      links: [
        { name: "Dashboard", href: "/dashboard/farmer", icon: <LayoutDashboard size={20} /> },
        { name: "My Crops", href: "/dashboard/farmer/crops", icon: <Sprout size={20} /> },
      ]
    },
    admin: {
      title: "Admin Control",
      color: "text-rose-600",
      bg: "bg-rose-50",
      accent: "bg-rose-600",
      icon: <ShieldAlert size={22} />,
      links: [
        { name: "Analytics", href: "/dashboard/admin", icon: <LayoutDashboard size={20} /> },
        { name: "Users", href: "/dashboard/admin/users", icon: <User size={20} /> },
      ]
    }
  };

  const config = roleConfig[role] || roleConfig.buyer;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 288, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            // Changed h-screen to min-h-screen and added sticky top-0
            className="hidden lg:flex flex-col bg-white border-r border-slate-200 min-h-screen sticky top-0 self-start z-30 overflow-hidden"
          >
            <div className="w-72 flex flex-col h-full">
              {/* Logo Section */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl ${config.bg} ${config.color} shadow-sm`}>
                    {config.icon}
                  </div>
                  <h2 className="font-extrabold text-xl tracking-tight text-slate-800">
                    {config.title.split(' ')[0]}<span className={config.color}>{config.title.split(' ')[1]}</span>
                  </h2>
                </div>
                <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">
                  System v2.0
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 space-y-1">
                {config.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.name} href={link.href} className="relative group block">
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive ? `${config.color} ${config.bg}` : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                        }`}>
                        {link.icon}
                        <span className="flex-1">{link.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className={`absolute -left-1 w-1.5 h-6 rounded-r-full ${config.accent}`}
                          />
                        )}
                        <ChevronRight size={14} className={`transition-transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 transition-all">
                  <Settings size={20} />
                  Settings
                </button>
                <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-rose-500 hover:bg-rose-50 transition-all mt-1">
                  <LogOut size={20} />
                  Sign Out
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {/* Removed h-screen and overflow-y-auto so the whole page scrolls */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Modern Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 rounded-xl bg-white text-slate-600 hover:text-slate-900 shadow-sm border border-slate-200 transition-all hover:border-slate-300"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100/50 border border-slate-200 rounded-xl w-64 text-slate-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-200 transition-all">
                <Search size={18} />
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
                <Bell size={22} />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>

              <div className="h-8 w-px bg-slate-200 mx-2"></div>

              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-none">Alex Johnson</p>
                  <p className={`text-[10px] font-bold mt-1 uppercase tracking-tighter ${config.color}`}>{role}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${config.accent} flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/10`}>
                  {role.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}