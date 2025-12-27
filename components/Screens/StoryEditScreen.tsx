"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Backbtn from "@/components/back-btn/page";
import StoryForm from "@/components/Story/StoryForm";
import { useStory } from "@/context/StoryContext";
import StoryEditor from "@/components/Story/StoryEditor";
import StoryModals from "@/components/Story/StoryModals";

export default function StoryEditScreen() {

    const { story, storySaving } = useStory();
    const router = useRouter();

    const saveStory = () => {
        const saveStoryBtn: any = document.getElementById("saveStoryBtn");
        if (saveStoryBtn != null) {
            saveStoryBtn.click();
        }
    }

    const updateBookTopBtn = () => {
        const updateStoryModalBtn: any = document.getElementById("updateStoryModalBtn");
        if (updateStoryModalBtn != null) {
            updateStoryModalBtn.click();
        }
    }

    return (
        <>

            <div className="flex justify-center md:justify-between w-full mb-[18px] md:mb-[5px]">
                <div className="flex items-center">
                    <Backbtn onClick={() => router.push(`/my-stories/${story?._id}`)} className="static-back-btn me-2" />
                    <h1 className="text-[#fff] hidden md:block text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[5px]">
                        Edit Book
                    </h1>
                </div>

                <div className="flex align-center">

                    {
                        (story?.totalEdits ?? 0) >= (story?.editsAllowed ?? 0) ? <>
                            <p className="m-0 p-4 text-[18px] flex place-items-center text-white">
                                No more edits allowed
                            </p>
                        </> : <>
                            <h4 className="m-0 p-4 text-[18px] flex place-items-center text-white">{story?.totalEdits}/{story?.editsAllowed}</h4>

                            <button
                                onClick={updateBookTopBtn}
                                type="button"
                                className="flex bg-[#C4CD24] mx-3 my-3 rounded-[40px] p-[15px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
                            >
                                <Image
                                    src="/assets/images/regenrate-simple.svg"
                                    width={24}
                                    height={24}
                                    alt="icon"
                                    className="w-[24px] h-[24px] blackimg object-cover me-2"
                                />
                                <span>Update Book</span>
                            </button>
                        </>
                    }

                    <button
                        disabled={storySaving}
                        type="button"
                        className="flex bg-[#C4CD24] my-3 rounded-[40px] p-[15px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
                        onClick={saveStory}
                    >
                        {
                            storySaving ? <>
                                <Image
                                    src="/assets/images/regenrate-simple.svg"
                                    width={24}
                                    height={24}
                                    alt="icon"
                                    className="animate-spin blackimg w-[24px] h-[24px] blackimg object-cover me-2"
                                />
                                <span>Saving...</span>
                            </> : <>
                                <span>Save Changes</span>
                            </>
                        }
                    </button>
                </div>

            </div>

            <div className="w-full bg-[#ebebeb10] rounded-[48px] w-full p-[15px] md:p-[20px]">
                <div className="bg-[#EBEBEB] rounded-[24px] p-[15px] md:p-[20px] relative">

                    <div className="book-recreate-alter">
                        <b>Alert:</b>
                        <p>
                            Changing “About Your Story” will change your entire book and redo the story. Story can only be changed 3 times.
                        </p>
                    </div>

                    {
                        story ? <>

                            <StoryForm
                                story={story}
                            />

                        </> : null
                    }

                </div>

                <StoryEditor />
                <StoryModals />

            </div>

        </>
    );
}
