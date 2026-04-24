import Link from "next/link";
import { Sprout, Twitter, Instagram, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-accent py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sprout className="text-brand-light" size={28} />
              <span className="font-bold text-2xl text-white tracking-tight">Only Farmers</span>
            </Link>
            <p className="text-brand-accent/80 mb-6 max-w-sm">
              Empowering farmers to sell directly to buyers. Experience fair trade, transparent pricing, and real-time agricultural auctions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Marketplace</h3>
            <ul className="space-y-3">
              <li><Link href="/marketplace" className="text-brand-accent/80 hover:text-white transition-colors">All Crops</Link></li>
              <li><Link href="/auction/featured" className="text-brand-accent/80 hover:text-white transition-colors">Live Auctions</Link></li>
              <li><Link href="#" className="text-brand-accent/80 hover:text-white transition-colors">Top Farmers</Link></li>
              <li><Link href="#" className="text-brand-accent/80 hover:text-white transition-colors">Seasonal Produce</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-brand-accent/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-brand-accent/80 hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="#" className="text-brand-accent/80 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-brand-accent/80 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-primary/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-accent/60 text-sm">
            &copy; {new Date().getFullYear()} Only Farmers. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-brand-accent/60 text-sm">
            <Mail size={16} />
            <a href="mailto:hello@onlyfarmers.com" className="hover:text-white transition-colors">
              hello@onlyfarmers.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
