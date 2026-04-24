"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, Clock, TrendingUp, User, CheckCircle2 } from "lucide-react";

export default function AuctionInterface({ crop }) {
  const [currentBid, setCurrentBid] = useState(crop.price);
  const [bidAmount, setBidAmount] = useState(currentBid + 5);
  const [bids, setBids] = useState([
    { id: 1, user: "Alex M.", amount: crop.price, time: "2 mins ago" },
  ]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsWinner(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleBid = (e) => {
    e.preventDefault();
    if (bidAmount > currentBid) {
      setCurrentBid(bidAmount);
      setBids([
        { id: Date.now(), user: "You", amount: bidAmount, time: "Just now" },
        ...bids
      ]);
      setBidAmount(bidAmount + 5);
      
      // Add a slight time extension if bid is placed in last 30 seconds
      if (timeLeft < 30) {
        setTimeLeft(timeLeft + 30);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col md:flex-row">
      {/* Left side: Auction Status */}
      <div className="p-8 flex-1 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-bold mb-4 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Live Auction
            </div>
            <h2 className="text-3xl font-black text-brand-dark mb-2">Current Highest Bid</h2>
            <p className="text-5xl font-black text-brand-primary">${currentBid}</p>
          </div>
          
          <div className="text-right">
            <p className="text-gray-500 font-medium mb-1 flex items-center gap-1 justify-end">
              <Clock size={16} />
              Time Remaining
            </p>
            <p className={`text-4xl font-black ${timeLeft < 60 ? 'text-red-500' : 'text-brand-dark'}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        {isWinner ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-100 border border-green-200 rounded-2xl p-6 text-center"
          >
            <CheckCircle2 className="mx-auto text-green-500 mb-2" size={48} />
            <h3 className="text-2xl font-bold text-green-800 mb-1">Auction Won!</h3>
            <p className="text-green-700">Congratulations, you secured the harvest for ${currentBid}.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleBid} className="space-y-4">
            <div>
              <label htmlFor="bid" className="block text-sm font-medium text-gray-700 mb-1">Your Bid Amount ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  id="bid"
                  min={currentBid + 1}
                  step="0.01"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-xl font-bold outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[5, 10, 25].map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setBidAmount(currentBid + amt)}
                  className="py-2 border border-brand-primary/30 rounded-lg text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-colors"
                >
                  +${amt}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-xl font-bold shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
            >
              <Gavel size={24} />
              Place Bid Now
            </button>
          </form>
        )}
      </div>

      {/* Right side: Bid History */}
      <div className="w-full md:w-80 p-8 bg-white flex flex-col h-[500px] md:h-auto">
        <h3 className="font-bold text-xl text-brand-dark mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-brand-primary" />
          Bid History
        </h3>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <AnimatePresence>
            {bids.map((bid, idx) => (
              <motion.div
                key={bid.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-xl border ${idx === 0 ? 'bg-brand-accent/30 border-brand-primary/20' : 'bg-gray-50 border-gray-100'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    <span className={`font-semibold ${idx === 0 ? 'text-brand-primary' : 'text-gray-700'}`}>
                      {bid.user}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{bid.time}</span>
                </div>
                <p className="text-lg font-black text-brand-dark">${bid.amount.toFixed(2)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
