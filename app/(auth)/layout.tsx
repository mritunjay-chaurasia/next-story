"use client"

import AuthHeader from "@/components/auth-header/page";
import AuthFooter from "@/components/auth-footer/page";
import Image from "next/image";
import { useEffect } from "react";
import { getLocalStorageItem } from "@/lib/localStorage";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  useEffect(() => {
    const token = getLocalStorageItem("authToken");
    if (token) {
      router.push("/my-stories");
    }
  }, []);

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-sub-wrapper min-h-screen flex flex-col">
          <Image
            src="/assets/images/orange-shadow.png"
            width={500}
            height={200}
            alt="shadow"
            className="shadow-image"
          />
          <Image
            src="/assets/images/orange-shadow.png"
            width={500}
            height={200}
            alt="shadow"
            className="shadow-image-bottom"
          />
          <AuthHeader />
          <div className="flex-1 container mx-auto relative z-10 flex justify-center">
            <div className="flex flex-col items-center justify-center md:px-6 py-8 mx-auto w-full md:w-[550px] lg:py-0 ">
              <div className="w-full bg-[#ebebeb10] rounded-[48px] w-full md:w-[550px] p-[20px]">
                {children}
              </div>
            </div>
          </div>
          <AuthFooter />
        </div>
      </div>
    </>
  );
}
