"use client"

import SiteFooter from "@/components/Layouts/SiteFooter";
import SiteHeader from "@/components/Layouts/SiteHeader";
import { UserProvider } from "@/context/UserContext";


export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <UserProvider>
                <div className="blue-bg min-h-screen flex flex-col justify-between">
                    <SiteHeader />
                    {children}
                    <SiteFooter />
                </div>
            </UserProvider>
        </>
    );
}
