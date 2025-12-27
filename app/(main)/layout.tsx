"use client";

import MainHeader from "@/components/main-header/page";
import { useRouter } from "next/navigation";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getLocalStorageItem } from "@/lib/localStorage";
import { useEffect } from "react";
import { UserProvider } from "@/context/UserContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = getLocalStorageItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <UserProvider>
        <div className='auth-wrapper main-pages'>
          <div className='bg-[#2B1354] min-h-screen flex flex-col'>
            <MainHeader />
            {children}
          </div>
        </div>
      </UserProvider>
    </>
  );
}
