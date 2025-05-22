"use client";

import { useRouter } from "next/navigation";
import ProductsPage from "./products/page";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/state";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  // router.push('/products');
  return (<ProductsPage></ProductsPage>);
}
