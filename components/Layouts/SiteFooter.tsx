"use client"
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {

  return (
    <>
      <footer className="py-[35px] bg-[#3E216E]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start  md:items-center justify-between gap-[30px]">
            <Link href="/">
              <Image
                className='site-logo cursor-pointer'
                width={38}
                height={50}
                alt='site-logo'
                src='/assets/images/logo-secondary.png?v=1'
              />
            </Link>
            <ul className="flex flex-col md:flex-row items-start md:items-center gap-[24px]">
              <li>
                <Link href="/#about-us" className="text-white font-poppins text-[18px] font-light leading-none hover:underline ">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-white font-poppins text-[18px] font-light leading-none hover:underline ">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-white font-poppins text-[18px] font-light leading-none hover:underline ">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
