"use client";

import { MapPin, User, Package, Tag, Sprout, Flame } from "lucide-react";

export default function ProductCard({ product, t, tCats }) {
  if (!t || !tCats) return null; // Wait for translations

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case "Organic": return <Sprout className="w-3 h-3 mr-1" />;
      case "High Demand": return <Flame className="w-3 h-3 mr-1" />;
      case "Fresh": return <Tag className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Organic": return "bg-green-100 text-green-700";
      case "High Demand": return "bg-orange-100 text-orange-700";
      case "Fresh": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div 
      onClick={() => alert(t.comingSoon)}
      className="bg-white h-full rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col group"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badges?.map((badge, idx) => (
            <span key={idx} className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full shadow-sm flex items-center w-max ${getBadgeColor(badge)}`}>
              {getBadgeIcon(badge)}
              {t.badges[badge] || badge}
            </span>
          ))}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border shadow-sm ${
            product.inStock 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {product.inStock ? t.inStock : t.outOfStock}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={product.name}>
            {product.name}
          </h3>
          <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded font-semibold whitespace-nowrap">
            {tCats[product.category] || product.category}
          </span>
        </div>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{product.farmerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{product.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{product.quantityAvailable} {t.available}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">{t.price}</p>
            <p className="font-bold text-green-700 text-xl">
              ₹{product.price.toLocaleString('en-IN')}
              <span className="text-sm font-normal text-gray-500"> / {product.unit}</span>
            </p>
          </div>
          <div className="text-right">
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
              {t.viewDetails}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
