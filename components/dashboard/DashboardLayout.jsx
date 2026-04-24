"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Sprout, LayoutDashboard, ShoppingBag, 
  Settings, LogOut, Menu, X, Bell,
  User, Tractor, ShieldAlert
} from "lucide-react";

export default function DashboardLayout({ children, role }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Role-specific configuration
  const roleConfig = {
    buyer: {
      title: "Buyer Portal",
      icon: <User size={24} className="text-brand-primary" />,
      links: [
        { name: "Overview", href: "/dashboard/buyer", icon: <LayoutDashboard size={20} /> },
        { name: "My Orders", href: "/dashboard/buyer/orders", icon: <ShoppingBag size={20} /> },
      ]
    },
    farmer: {
      title: "Farmer Hub",
      icon: <Tractor size={24} className="text-orange-500" />,
      links: [
        { name: "Dashboard", href: "/dashboard/farmer", icon: <LayoutDashboard size={20} /> },
        { name: "My Crops", href: "/dashboard/farmer/crops", icon: <Sprout size={20} /> },
      ]
    },
    admin: {
      title: "Admin Control",
      icon: <ShieldAlert size={24} className="text-red-500" />,
      links: [
        { name: "Analytics", href: "/dashboard/admin", icon: <LayoutDashboard size={20} /> },
        { name: "Users", href: "/dashboard/admin/users", icon: <User size={20} /> },
      ]
    }
  };

  const config = roleConfig[role] || roleConfig.buyer;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside 
        initial={{ width: 280 }}
        animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="bg-white border-r border-gray-200 h-screen sticky top-0 overflow-hidden flex flex-col z-20"
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-100 w-[280px]">
          <div className="bg-gray-50 p-2 rounded-xl">
            {config.icon}
          </div>
          <div>
            <h2 className="font-bold text-brand-dark text-lg leading-tight">{config.title}</h2>
            <p className="text-xs text-gray-500">Only Farmers</p>
          </div>
        </div>

        <nav className="flex-1 p-4 w-[280px]">
          <ul className="space-y-2">
            {config.links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    pathname === link.href 
                      ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-brand-dark"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100 w-[280px]">
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-dark transition-all">
                <Settings size={20} />
                Settings
              </button>
            </li>
            <li>
              <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all">
                <LogOut size={20} />
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4 px-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="text-xl font-bold text-brand-dark hidden sm:block">
                Welcome back, {role === 'admin' ? 'Admin' : 'User'}!
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-white font-bold">
                  {role.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
