"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Menu, X, ShoppingBag, Gavel, User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Don't show navbar on auth routes
  if (pathname.startsWith('/login')) {
    return null;
  }

  const links = [
    { name: "Home", href: "/", icon: <Sprout size={18} /> },
    { name: "Marketplace", href: "/marketplace", icon: <ShoppingBag size={18} /> },
    { name: "Live Auctions", href: "/auction/featured", icon: <Gavel size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-brand-primary p-2 rounded-xl">
                <Sprout className="text-white" size={24} />
              </div>
              <span className="font-bold text-xl text-brand-dark tracking-tight">Only Farmers</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand-primary ${
                  pathname === link.href ? "text-brand-primary" : "text-gray-600"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <Link href="/login" className="flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg">
              <User size={18} />
              Sign In / Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-brand-primary p-2 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium ${
                    pathname === link.href
                      ? "bg-brand-accent text-brand-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/login" className="w-full flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-4 py-3 rounded-xl text-base font-bold transition-colors">
                  <User size={20} />
                  Sign In / Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
