"use client"

import SiteLayout from "@/components/Layouts/SiteLayout";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <SiteLayout>
        {children}
      </SiteLayout>
    </>
  );
}
