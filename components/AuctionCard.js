"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, MapPin, User } from "lucide-react";

export default function AuctionCard({ auction, t }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!t) return;

    const updateStatusAndTimer = () => {
      const now = new Date().getTime();
      const start = new Date(auction.auctionStartTime).getTime();
      const end = new Date(auction.auctionEndTime).getTime();

      if (now > end) {
        setStatus("ENDED");
        setTimeLeft(t.auctionEnded);
      } else if (now < start) {
        setStatus("UPCOMING");
        const distance = start - now;
        setTimeLeft(`${t.startsIn} ${formatTime(distance)}`);
      } else {
        setStatus("LIVE");
        const distance = end - now;
        setTimeLeft(`${t.endsIn} ${formatTime(distance)}`);
      }
    };

    updateStatusAndTimer();
    const timer = setInterval(updateStatusAndTimer, 1000);
    return () => clearInterval(timer);
  }, [auction, t]);

  const formatTime = (distance) => {
    if (!t) return "";
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days > 0) return `${days}${t.days} ${hours}${t.hours}`;
    return `${hours}${t.hours} ${minutes}${t.minutes} ${seconds}${t.seconds}`;
  };

  const getStatusStyles = () => {
    switch (status) {
      case "LIVE": return "bg-green-100 text-green-800 border-green-200";
      case "UPCOMING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ENDED": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = () => {
    if (!t) return "";
    switch (status) {
      case "LIVE": return t.statusLive;
      case "UPCOMING": return t.statusUpcoming;
      case "ENDED": return t.statusEnded;
      default: return "";
    }
  };

  if (!t) return null; // Wait for translations to be ready

  return (
    <Link href={`/auction/${auction.id}`} className="group block h-full">
      <div className="bg-white h-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden shrink-0">
          <img 
            src={auction.productImage} 
            alt={auction.productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 text-xs font-bold rounded-full border shadow-sm ${getStatusStyles()}`}>
              {getStatusLabel()}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={auction.productName}>
              {auction.productName}
            </h3>
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded font-semibold whitespace-nowrap">
              {auction.quantity}
            </span>
          </div>

          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate">{auction.farmerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate">{auction.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 mb-4 mt-auto">
            <div>
              <p className="text-xs text-gray-500 mb-1">{t.basePrice}</p>
              <p className="font-semibold text-gray-700">₹{auction.basePrice.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">{t.currentBid}</p>
              <p className="font-bold text-green-600 text-lg">₹{auction.currentBid.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className={`flex items-center justify-center gap-2 p-3 rounded-xl font-medium text-sm transition-colors
            ${status === 'LIVE' ? 'bg-green-50 text-green-700 group-hover:bg-green-100' : 
              status === 'UPCOMING' ? 'bg-yellow-50 text-yellow-700 group-hover:bg-yellow-100' : 
              'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`}>
            <Clock className="w-4 h-4" />
            <span className="tabular-nums">{timeLeft}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
