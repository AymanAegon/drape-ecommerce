"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { db, auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/state";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email || '',
          fullName: fullName || '',
        });
      } else {
        console.error("user not found after signup");
        setError("user not found after signup");
      }
      // Optionally save name in Firestore or update profile here
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError(err.message);
      }
      return;
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5E9DC] px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-[#E4D4C4]">
        {/* Logo and brand */}
        <div className="flex items-center justify-center">
          <Image src="/logo.svg" alt="Drape Logo" width={150} height={150} priority />
        </div>

        {/* Sign Up Heading */}
        <h2 className="text-xl font-semibold text-center text-[#4B3621] mb-6">Create an account</h2>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#4B3621]">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#D8C1A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A27D] bg-[#FFF7F0]"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#7B4F34] text-white font-semibold hover:bg-[#5E3C25] transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#4B3621]">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-[#7B4F34] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Singup;