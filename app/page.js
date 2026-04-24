import HeroSection from "@/components/HeroSection";
import FarmerCard from "@/components/FarmerCard";

// Dummy data for featured crops
const FEATURED_CROPS = [
  {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    quantity: "50 lbs",
    price: 3.50,
    unit: "lb",
    isAuction: false,
    farmer: {
      name: "Green Valley Farm",
      location: "Sacramento, CA",
      rating: 4.9,
    }
  },
  {
    id: 2,
    name: "Premium Hass Avocados",
    quantity: "100 boxes",
    price: 45.00,
    unit: "box",
    isAuction: true,
    farmer: {
      name: "Sunny Side Orchards",
      location: "San Diego, CA",
      rating: 4.8,
    }
  },
  {
    id: 3,
    name: "Fresh Sweet Corn",
    quantity: "200 dozens",
    price: 5.00,
    unit: "dozen",
    isAuction: false,
    farmer: {
      name: "Midwest Harvest",
      location: "Des Moines, IA",
      rating: 4.7,
    }
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
                Featured Harvest
              </h2>
              <p className="text-gray-600 max-w-2xl text-lg">
                Discover the freshest premium crops directly from top-rated local farmers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_CROPS.map((crop) => (
              <FarmerCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
