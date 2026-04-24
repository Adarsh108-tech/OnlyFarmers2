"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Gavel, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function FarmerCard({ crop }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-56 w-full overflow-hidden">
        {/* Placeholder image from unsplash based on crop name */}
        <Image
          src={`https://source.unsplash.com/800x600/?${crop.name.toLowerCase()}`}
          alt={crop.name}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-primary flex items-center gap-1 shadow-sm">
          <Star size={12} fill="currentColor" />
          <span>{crop.farmer.rating} / 5</span>
        </div>
        {crop.isAuction && (
          <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm animate-pulse">
            <Clock size={12} />
            <span>Auction Active</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-1">{crop.name}</h3>
            <p className="text-gray-500 text-sm">{crop.quantity} available</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-brand-primary">${crop.price}</p>
            <p className="text-gray-400 text-xs">per {crop.unit}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-brand-primary font-bold overflow-hidden">
             {crop.farmer.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-dark">{crop.farmer.name}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={10} />
              {crop.farmer.location}
            </p>
          </div>
        </div>

        <Link
          href={crop.isAuction ? `/auction/${crop.id}` : `/marketplace`}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
            crop.isAuction
              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20"
              : "bg-brand-primary hover:bg-brand-dark text-white shadow-md shadow-brand-primary/20"
          }`}
        >
          {crop.isAuction ? (
            <>
              <Gavel size={18} />
              Join Auction
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Buy Now
            </>
          )}
        </Link>
      </div>
    </motion.div>
  );
}
