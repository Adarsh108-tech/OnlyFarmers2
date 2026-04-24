"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, ShieldCheck } from "lucide-react";
import AuctionInterface from "@/components/AuctionInterface";

// Dummy data for a specific auction crop
const AUCTION_CROP = {
  id: "featured",
  name: "Premium Hass Avocados",
  description: "A freshly picked batch of our finest Hass avocados. Perfect for restaurants or large-scale retail. Grown organically without any synthetic pesticides.",
  quantity: "100 boxes",
  price: 45.00, // starting price
  unit: "box",
  harvestDate: "Oct 24, 2026",
  farmer: {
    name: "Sunny Side Orchards",
    location: "San Diego, CA",
    rating: 4.8,
    reviews: 124,
    memberSince: "2023"
  }
};

export default function AuctionPage({ params }) {
  // In a real app, you'd fetch the crop by params.id
  const crop = AUCTION_CROP;

  return (
    <div className="bg-brand-bg min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary font-medium mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-md">
              <Image
                src={`https://source.unsplash.com/800x600/?avocados`}
                alt={crop.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-brand-dark shadow-sm">
                Lot #{crop.id.toUpperCase()}-082
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-black text-brand-dark mb-4">{crop.name}</h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {crop.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Total Quantity</p>
                  <p className="text-xl font-bold text-brand-dark">{crop.quantity}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Harvest Date</p>
                  <p className="text-xl font-bold text-brand-dark">{crop.harvestDate}</p>
                </div>
              </div>
            </div>

            {/* Farmer Profile Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-brand-dark">About the Farmer</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-white text-2xl font-bold">
                  {crop.farmer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-lg flex items-center gap-2">
                    {crop.farmer.name}
                    <ShieldCheck size={18} className="text-blue-500" />
                  </h4>
                  <p className="text-gray-500 flex items-center gap-1 text-sm">
                    <MapPin size={14} />
                    {crop.farmer.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" fill="currentColor" />
                  <span className="font-bold">{crop.farmer.rating}</span>
                  <span className="text-gray-400">({crop.farmer.reviews} reviews)</span>
                </div>
                <div className="text-gray-400">•</div>
                <div className="text-gray-500">Member since {crop.farmer.memberSince}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Auction UI */}
          <div className="lg:col-span-7">
             <div className="sticky top-24">
               <AuctionInterface crop={crop} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
