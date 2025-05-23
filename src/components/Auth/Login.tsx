"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { useAuth } from "@/context/state";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user !== null) {
      // router.push("/");
      router.back();
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!password) {
        throw new Error('Password is required to sign in.');
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError('Incorrect credential!!');
      } else {
        console.log(err.code);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5E9DC] px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-[#E4D4C4]">
        {/* Logo and brand */}
        <div className="flex items-center justify-center">
          <Image src="/logo.svg" alt="Drape Logo" width={150} height={150} priority />
        </div>

        {/* Form */}
        <h2 className="text-xl font-semibold text-center text-[#4B3621] mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#4B3621]">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-[#D8C1A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A27D] bg-[#FFF7F0]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4B3621]">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-[#D8C1A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A27D] bg-[#FFF7F0]"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right text-sm mt-2">
              <a href="#" className="text-[#7B4F34] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#7B4F34] text-white font-semibold hover:bg-[#5E3C25] transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#4B3621]">
          Don’t have an account?{" "}
          <a href="signup" className="font-semibold text-[#7B4F34] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;