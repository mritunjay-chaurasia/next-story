"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeLocalStorageItem } from "@/lib/localStorage";
import { useUser } from "@/context/UserContext";
import ProfileModal from "../models/ProfileModal";

export default function MainHeader() {
  const { user } = useUser();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  function openMenufun() {
    setOpenMenu((prev) => !prev);
  }

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    removeLocalStorageItem("authToken");
    router.push("/login");
  };

  const takeToHome = () => {
    router.push("/");
  };

  const openProfileModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProfileModalOpen(true);
  };

  return (
    <>
      <header className='bg-[#331C5B]'>
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
              <Image
                className='site-logo cursor-pointer'
                onClick={takeToHome}
                width={38}
                height={50}
                alt='site-logo'
                src='/assets/images/logo-secondary.png?v=1'
              />
            </div>

            <div className='flex items-center gap-[20px] md:gap-[34px]'>
              <ul
                className={`md:flex items-center gap-[34px] menu-links ${openMenu ? "menuopen" : ""
                  }`}
              >
                <li>
                  <Link
                    className='text-white font-poppins text-[16px] md:text-[18px] hover:underline font-light leading-normal'
                    href='/my-stories'
                  >
                    My Stories
                  </Link>
                </li>
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

              {/* Profile Dropdown */}
              <Menu>
                <MenuButton className='flex items-center gap-[12px] pb-2'>
                  <Image
                    width={48}
                    height={48}
                    alt='profile-img'
                    src={user?.profileImage || "/assets/images/profile-pic.png"}
                    className='w-[48px] h-[48px] object-cover rounded-full'
                  />
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    className='cursor-pointer'
                  >
                    <path
                      d='M11 4L6 9L1 4H11Z'
                      fill='#EBEBEB'
                      stroke='#EBEBEB'
                      strokeWidth='2'
                      strokeLinejoin='round'
                    />
                  </svg>
                </MenuButton>

                <MenuItems
                  anchor='bottom end'
                  className='bg-white shadow-lg rounded-[20px] p-[20px] min-w-[250px] z-50 flex flex-col items-start gap-[10px]'
                >
                  <div className='flex items-center gap-[10px]'>
                    <Image
                      width={40}
                      height={40}
                      alt='profile-img'
                      src={
                        user?.profileImage || "/assets/images/profile-pic.png"
                      }
                      className='w-[40px] h-[40px] object-cover rounded-full'
                    />
                    <div className='flex flex-col'>
                      <span className='text-[14px] font-semibold text-[#1E1E1E]'>
                        {user?.name || "Ashley Brown"}
                      </span>
                      <Link
                        href="#"
                        onClick={openProfileModal}
                        className='text-[#683BA4] text-[13px] no-underline'
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>

                  <hr className='w-full border-t border-[#eee] my-[10px]' />

                  <MenuItem>
                    <Link
                      onClick={handleLogout}
                      href='#'
                      className='bg-[#FFE8E4] hover:bg-[#ffdcd6] transition-all rounded-[12px] text-[#FF4A3E] px-[16px] py-[10px] w-full flex items-center gap-[10px]'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M16 17L21 12L16 7'
                          stroke='#FF4A3E'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M21 12H9'
                          stroke='#FF4A3E'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M12 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H12'
                          stroke='#FF4A3E'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      Logout
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </header>

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
}
