"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, User, Tractor, ShieldAlert, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("buyer"); // buyer, farmer, admin
  const router = useRouter();

  const roles = [
    { id: "buyer", label: "Buyer", icon: <User size={20} />, desc: "Purchase fresh crops" },
    { id: "farmer", label: "Farmer", icon: <Tractor size={20} />, desc: "Sell your harvest" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    setTimeout(() => {
      if (role === "admin") {
         router.push("/admin"); // Would redirect to admin panel
      } else if (role === "farmer") {
         router.push("/dashboard"); // Would redirect to farmer dashboard
      } else {
         router.push("/marketplace"); // Redirect buyers to marketplace
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-brand-light/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-brand-dark hover:text-brand-primary transition-colors font-bold text-xl">
        <div className="bg-brand-primary p-2 rounded-xl">
          <Leaf className="text-white" size={20} />
        </div>
        Only Farmers
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl p-8 md:p-12"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-brand-dark mb-2">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-gray-500">
            {isLogin ? "Sign in to access your account." : "Join the premium agricultural marketplace."}
          </p>
        </div>

        {/* Toggle Login/Register */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${isLogin ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isLogin ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Register
          </button>
        </div>

        {/* Role Selection (Only show on register or if we want explicit role login) */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-3">Select your role</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  role === r.id 
                    ? "border-brand-primary bg-brand-accent/30 text-brand-primary" 
                    : "border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                {role === r.id && (
                  <div className="absolute top-2 right-2">
                    <Check size={16} />
                  </div>
                )}
                <div className="mb-2">{r.icon}</div>
                <span className="font-bold">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  required={!isLogin}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              required
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              {isLogin && <a href="#" className="text-sm font-semibold text-brand-primary hover:underline">Forgot password?</a>}
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mt-6"
          >
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          By continuing, you agree to Only Farmers' <a href="#" className="text-brand-dark font-semibold underline">Terms of Service</a> and <a href="#" className="text-brand-dark font-semibold underline">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
