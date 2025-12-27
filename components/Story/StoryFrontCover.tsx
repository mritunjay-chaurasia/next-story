"use client";

import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { updateStory } from "@/services/story-service";
import toast from "react-hot-toast";
import { useStory } from "@/context/StoryContext";

export default function StoryFrontCover({ }) {

    const { story, setOpenBuyHardCopyModal, setOpenUpdateCoverModal, setOpenDownloadModal } = useStory();

    const saveStory = (updatedStory: Story) => {
        if (updatedStory) {
            updateStory(updatedStory._id, {
                ...updatedStory
            }).then(() => {
                //saved
            }).catch((err: any) => {
                toast.error(err?.message ?? "Failed to save story");
            })
        }
    }

    const handleSceneUpdate = (updatedScene: Scene, index: number) => {

        if (!story) return false;

        let tempStory = { ...story };
        const updatedScenes = [...tempStory.scenes];
        updatedScenes[index] = updatedScene;
        tempStory = {
            ...tempStory,
            scenes: updatedScenes,
        };

        saveStory(tempStory);
        // setStory(tempStory);
    };

    return (
        <>
            <div className="story-front-page-cover h-full order-2 md:order-1 flex flex-col justify-between mt-4 gap-[18px] md:gap-0">
                <div className="mb-5">
                    <h2 className="text-[#2B282F] candal-font text-[28px] font-normal leading-normal tracking-[-1.12px] mb-[34px]">
                        {story?.title}
                    </h2>
                    {/* <h2 title={story?.description} className="text-[#2B282F] story-description-box tracking-[-1.12px] mb-[34px]">
                        {story?.description}
                    </h2> */}
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-[18px]">
                        <Link
                            prefetch
                            href={`/my-stories/edit/${story._id}`}
                            className="rounded-[24px] bg-[#EEEEEE] w-full flex flex-col gap-[8px] items-center p-[24px] cursor-pointer"
                        >
                            <Image
                                width={34}
                                height={34}
                                src="/assets/images/edit-img.svg"
                                alt="edit-icon"
                            />
                            <p className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                                Edit Book
                            </p>
                        </Link>
                        <Button
                            onClick={() => setOpenUpdateCoverModal(true)}
                            className="rounded-[24px] bg-[#EEEEEE] w-full flex flex-col gap-[8px] items-center p-[24px] cursor-pointer"
                        >
                            <Image
                                width={34}
                                height={34}
                                src="/assets/images/edit-img.svg"
                                alt="edit-icon"
                            />
                            <p className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                                Updated Cover
                            </p>
                        </Button>
                        <Button
                            onClick={() => setOpenDownloadModal(true)}
                            className="rounded-[24px] bg-[#EEEEEE] w-full flex flex-col gap-[8px] items-center p-[24px] cursor-pointer">
                            <Image
                                width={34}
                                height={34}
                                src="/assets/images/edit-img.svg"
                                alt="edit-icon"
                            />
                            <p className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                                Download Book
                            </p>
                        </Button>
                        {
                            story.hardCopyPurchase ? <>
                                <Button onClick={() => setOpenBuyHardCopyModal(true)} className="rounded-[24px] bg-[#c4cd2433] w-full flex flex-col gap-[8px] items-center p-[24px] cursor-pointer">
                                    <Image
                                        width={34}
                                        height={34}
                                        src="/assets/images/purchased.png"
                                        alt="edit-icon"
                                    />
                                    <p className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                                        Hard Copy Purchased
                                    </p>
                                </Button>
                            </> : <>
                                <div className="flex flex-col gap-[8px] w-full">
                                    <p className="text-[#6F6A77] py-1 font-poppins text-[14px] !italic font-medium leading-normal">
                                        Want to buy a hard copy for this book?
                                    </p>
                                    <Button
                                        onClick={() => setOpenBuyHardCopyModal(true)}
                                        className="p-[6px] py-[12px] cursor-pointer w-full pl-[24px] flex items-center justify-between gap-[18px] bg-[#2B1354] rounded-[40px]"
                                    >
                                        <span className="text-[#EBEBEB] font-poppins text-[16px] font-medium leading-normal">
                                            Buy Hard Copy
                                        </span>
                                        <Image
                                            width={42}
                                            height={42}
                                            src="/assets/images/next-icon.svg"
                                            alt="next-icon"
                                        />
                                    </Button>
                                </div>
                            </>
                        }
                    </div>
                </div>

                <div className="mt-[30px]">
                    <Link
                        prefetch
                        href={`/my-stories/edit/${story._id}`}
                        className="p-[6px] w-full md:w-fit pl-[24px] flex items-center justify-between gap-[18px]  rounded-[40px] border border-[#2B1354]"
                    >
                        <span className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                            Next Step: Review & Edit Book
                        </span>
                        <Image
                            width={42}
                            height={42}
                            src="/assets/images/next-icon.svg"
                            alt="next-icon"
                        />
                    </Link>
                </div>

            </div>

        </>
    );
}
