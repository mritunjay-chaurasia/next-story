"use client";

import Image from "next/image";
import Link from "next/link";
import { useStory } from "@/context/StoryContext";

export default function StoryBackCover({ }) {

    const { story, setOpenBuyHardCopyModal } = useStory();

    return (
        <>
            <div className="story-back-page-cover h-full order-2 md:order-1 flex flex-col justify-between mt-4 gap-[18px] md:gap-0">
                <div className="mb-5 md:px-[50px] flex flex-col align-center justify-center h-full">
                    {
                        story.hardCopyPurchase ? <>
                            <h2 className="mb-4 mt-5 text-[#2B1354] text-center font-poppins text-[16px] font-medium leading-normal max-w-[80%] mx-auto">
                                Your book is ready to be printed. Once print request or download request you can't edit your book.
                            </h2>
                            <div className="grid md:grid-cols-1 items-center grid-cols-1 gap-[18px]">
                                <button
                                    type='button'
                                    className='flex w-full justify-center align-center bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer disabled:bg-gray-400'
                                >
                                    Request Print Now
                                </button>
                            </div>
                        </> : <>
                            <h2 className="mb-4 mt-5 text-[#2B1354] text-center font-poppins text-[16px] font-medium leading-normal max-w-[80%] mx-auto">
                                Get a hard copy delivered to your address added during checkout
                            </h2>
                            <div className="grid md:grid-cols-1 items-center grid-cols-1 gap-[18px]">
                                <button
                                    type='button'
                                    className='flex w-full justify-center align-center bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer disabled:bg-gray-400'
                                    onClick={() => setOpenBuyHardCopyModal(true)}
                                >
                                    Buy Hard Copy
                                </button>
                            </div>
                        </>
                    }
                    <div className="or-divider my-5 relative w-full text-center">
                        <span className="!bg-[#FFFFFF]">Share to</span>
                    </div>
                    <div className="flex gap-[12px] items-center justify-center">
                        <Link href="#" className="rounded-full bg-[#EEEEEE] flex items-center justify-center w-[54px]  h-[54px]">
                            <Image
                                width={20}
                                height={20}
                                alt="icon"
                                src="/assets/images/lucide.svg"
                            />
                        </Link>
                        <Link href="#" className="rounded-full bg-[#EEEEEE] flex items-center justify-center w-[54px]  h-[54px]">
                            <Image
                                width={20}
                                height={20}
                                alt="icon"
                                src="/assets/images/facebook.svg"
                            />
                        </Link>
                        <Link href="#" className="rounded-full bg-[#EEEEEE] flex items-center justify-center w-[54px]  h-[54px]">
                            <Image
                                width={20}
                                height={20}
                                alt="icon"
                                src="/assets/images/instagram.svg"
                            />
                        </Link>
                        <Link href="#" className="rounded-full bg-[#EEEEEE] flex items-center justify-center w-[54px]  h-[54px]">
                            <Image
                                width={20}
                                height={20}
                                alt="icon"
                                src="/assets/images/x.svg"
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex justify-end w-full">
                    <Link
                        prefetch
                        href={`/my-stories/`}
                        className="p-[6px] w-fit pr-[24px] flex items-center justify-between gap-[18px]  rounded-[40px] border border-[#2B1354] md:ml-auto cursor-pointer"
                    >
                        <Image
                            width={42}
                            height={42}
                            src="/assets/images/back-blue-btn.svg"
                            alt="next-icon"
                        />
                        <span className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                            Go Back to Stories
                        </span>
                    </Link>
                </div>

            </div>

        </>
    );
}
