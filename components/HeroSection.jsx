"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-brand-bg pt-24 pb-32">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-light/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/50 text-brand-primary font-medium text-sm mb-8 border border-brand-primary/20"
          >
            <Leaf size={16} />
            <span>Empowering local agriculture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-brand-dark tracking-tight mb-8 leading-tight"
          >
            Fresh from the Farm, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-light">
              Direct to Your Table
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            A premium marketplace connecting buyers directly with farmers. Experience fair trade, transparent pricing, and real-time agricultural auctions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/marketplace"
              className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Explore Marketplace
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/auction/featured"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-dark border-2 border-gray-200 hover:border-gray-300 px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-sm"
            >
              View Live Auctions
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <ShieldCheck size={32} className="text-brand-primary" />,
              title: "Verified Farmers",
              description: "Every farmer is verified for quality and sustainable practices."
            },
            {
              icon: <TrendingUp size={32} className="text-brand-primary" />,
              title: "Fair Auctions",
              description: "Real-time bidding ensures fair market value for premium crops."
            },
            {
              icon: <Leaf size={32} className="text-brand-primary" />,
              title: "Freshness Guaranteed",
              description: "Direct logistics mean your produce arrives faster and fresher."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-sm border border-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-brand-accent w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
