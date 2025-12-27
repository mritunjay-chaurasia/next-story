"use client";

import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useStory } from "@/context/StoryContext";

type StoryDownloadModalProps = {
    onClose: () => void
}

export default function StoryDownloadModal({ onClose }: StoryDownloadModalProps) {

    const { setOpenDownloadModal } = useStory();

    return (
        <>
            <Dialog
                open={true}
                onClose={onClose}
                className="relative z-50"
            >
                <div
                    className="fixed inset-0 bg-black/30"
                    aria-hidden="true"
                />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-full md:w-[750px] rounded-[34px] bg-white p-6 shadow-lg relative">
                        <button
                            onClick={onClose}
                            className="absolute top-[24px] right-[24px] text-gray-600 hover:text-gray-800 cursor-pointer"
                            aria-label="Close"
                        >
                            <Image
                                width={24}
                                height={24}
                                alt="close-icon"
                                src="/assets/images/modal-close.svg"
                            />
                        </button>
                        <div className="mt-[24px] text-center grid grid-cols-1 gap-[18px]">
                            <h3 className="text-[#2B282F] mb-0 candal-font font-normal text-[22px] leading-normal tracking-[-0.88px]">Are You Sure You want to Download This Story?</h3>
                            <p className="text-[#6F6A77] font-poppins text-[16px] font-semibold leading-normal mb-[0px]">
                                This cannot be edited and it is the final version
                            </p>
                            <div className="flex gap-2 px-3">
                                <button
                                    onClick={onClose}
                                    className="bg-[#2B1354] w-full p-[15px] text-[#fff] rounded-[40px] cursor-pointer text-[#EBEBEB] text-center font-poppins text-[16px] font-medium leading-normal flex items-center justify-center gap-[12px] mt-[18px]">
                                    <span>No, Go Back</span>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="bg-[#C4CD24] w-full p-[15px] text-[#333] rounded-[40px] cursor-pointer text-[#333] text-center font-poppins text-[16px] font-medium leading-normal flex items-center justify-center gap-[12px] mt-[18px]"
                                >
                                    <span>Yes, Download</span>
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
