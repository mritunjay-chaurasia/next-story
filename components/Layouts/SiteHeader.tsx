"use client"

import { useUser } from "@/context/UserContext";
import {
    Button,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function SiteHeader() {

    const { isLoggedIn } = useUser();

    const [openMenu, setOpenMenu] = useState(false);

    function openMenufun() {
        setOpenMenu((prev) => !prev);
    }

    return (
        <>
            <header>
                <div className='container mx-auto'>
                    <div className='flex items-center justify-between py-[21px]'>
                        <div className='flex items-center gap-[20px]'>
                            <Button
                                onClick={openMenufun}
                                className='flex md:hidden w-[20px] h-[20px] flex-col items-center justify-center gap-[4px] cursor-pointer text-white font-bold leading-normal'
                            >
                                {openMenu ? (
                                    "x"
                                ) : (
                                    <>
                                        <span className='w-[20px] h-[2px] bg-[#fff]'></span>
                                        <span className='w-[20px] h-[2px] bg-[#fff]'></span>
                                        <span className='w-[20px] h-[2px] bg-[#fff]'></span>
                                    </>
                                )}
                            </Button>
                            <Link href="/">
                                <Image
                                    className='site-logo cursor-pointer'
                                    // onClick={takeToHome}
                                    width={38}
                                    height={50}
                                    alt='site-logo'
                                    src='/assets/images/logo-secondary.png?v=1'
                                />
                            </Link>
                        </div>

                        <div className='flex items-center gap-[20px] md:gap-[34px]'>
                            <ul
                                className={`md:flex items-center gap-[34px] menu-links ${openMenu ? "menuopen" : ""
                                    }`}
                            >
                                <li>
                                    <Link
                                        className='text-white font-poppins text-[16px] md:text-[18px] hover:underline font-light leading-normal'
                                        href='/#about-us'
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='text-white font-poppins text-[16px] md:text-[18px] hover:underline font-light leading-normal'
                                        href='/#how-it-works'
                                    >
                                        How it Works
                                    </Link>
                                </li>
                            </ul>
                            {
                                isLoggedIn ? <>
                                    <Link href={"/my-stories"} className="bg-[#EBEBEB] rounded-[40px] md:p-[6px] p-[10px] md:pl-[34px] flex items-center gap-[18px] cursor-pointer">
                                        <span className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                                            Dashboard
                                        </span>
                                        <Image
                                            width={42}
                                            height={42}
                                            alt="right-arrow"
                                            src="/assets/images/white-right.svg"
                                            className="p-[12px] rounded-full bg-[#2B1354] hidden md:block"
                                        />
                                    </Link>
                                </> : <>
                                    <Link href={"/login"} className="bg-[#EBEBEB] rounded-[40px] md:p-[6px] p-[10px] md:pl-[34px] flex items-center gap-[18px] cursor-pointer">
                                        <span className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                                            Get Started
                                        </span>
                                        <Image
                                            width={42}
                                            height={42}
                                            alt="right-arrow"
                                            src="/assets/images/white-right.svg"
                                            className="p-[12px] rounded-full bg-[#2B1354] hidden md:block"
                                        />
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
