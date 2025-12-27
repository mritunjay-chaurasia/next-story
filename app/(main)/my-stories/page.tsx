"use client"

import Image from "next/image";
import Link from "next/link";
import { Select } from "@headlessui/react";
import { useEffect, useState } from "react";
import { myStories } from "@/services/story-service";
import toast from "react-hot-toast";
import { bookCoverImage, printDateTime } from "@/utils/helpers";
import ContentLoader from "@/components/Loader/ContentLoader";

export default function MyStories() {

    const [sort, setSort] = useState("updated-desc");
    const [loading, setLoading] = useState(true);
    const [stories, setStories] = useState<Story[]>([]);
    const [totalStories, setTotalStories] = useState(0);

    const handleSortChange = (e: any) => {
        setSort(e.target.value);
    }

    const fetchStories = () => {
        setLoading(true);
        myStories({ sort }).then((res: any) => {
            setStories(res?.data?.docs);
            setTotalStories(res?.data?.totalDocs);
        }).catch((err) => {
            toast.error(err?.message ?? "Failed to load stories");
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchStories();
    }, [sort]);

    return (
        <>
            <section className="all-stories pb-[24px]">
                <div className="container mx-auto">
                    <div className="flex md:items-center  flex-col md:flex-row justify-between gap-[18px] mt-[36px]">
                        <h1 className="text-[#EBEBEB] font-candal text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font ">My Stories ({totalStories})</h1>
                        <div className="flex flex-col md:flex-row items-center gap-[18px]">
                            <Link prefetch href={"/create-story"} className="bg-[#EBEBEB] w-full md:w-fit rounded-[40px] p-[6px] flex items-center gap-[18px] pr-[44px] text-dark cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                    <circle cx="21" cy="21" r="21" fill="#C4CD24" />
                                    <path d="M21 29C20.858 29 20.739 28.952 20.643 28.856C20.547 28.76 20.4993 28.6413 20.5 28.5V21.5H13.5C13.358 21.5 13.2393 21.452 13.144 21.356C13.0487 21.26 13.0007 21.141 13 20.999C12.9993 20.857 13.0473 20.7383 13.144 20.643C13.2407 20.5477 13.3593 20.5 13.5 20.5H20.5V13.5C20.5 13.358 20.548 13.2393 20.644 13.144C20.74 13.0487 20.859 13.0007 21.001 13C21.143 12.9993 21.2617 13.0473 21.357 13.144C21.4523 13.2407 21.5 13.3593 21.5 13.5V20.5H28.5C28.642 20.5 28.7607 20.548 28.856 20.644C28.9513 20.74 28.9993 20.859 29 21.001C29.0007 21.143 28.9527 21.2617 28.856 21.357C28.7593 21.4523 28.6407 21.5 28.5 21.5H21.5V28.5C21.5 28.642 21.452 28.7607 21.356 28.856C21.26 28.9513 21.141 28.9993 20.999 29" fill="#2B1354" />
                                </svg>
                                <span>Create new Story</span>
                            </Link>
                            <Select value={sort} onChange={handleSortChange} className="rounded-[60px] w-full md:w-fit bg-[#EBEBEB] py-[15px] px-[24px] min-w-[200px] cursor-pointer">
                                <option value={"updated-desc"}>Latest Edited</option>
                                <option value={"updated-asc"}>Oldest Created</option>
                            </Select>
                        </div>
                    </div>

                    {
                        loading ? <>
                            <ContentLoader loadingText="Loading your stories..." />
                        </> : <>
                            {
                                stories && stories.length > 0 ? <>
                                    <div className="grid md:grid-cols-3 grid-cols-1 gap-[20px] mt-[24px]">
                                        {
                                            stories.map((story, index) => {
                                                return <Link prefetch={true} key={`story-${index}`} href={`/my-stories/${story._id}`} className=" rounded-[34px] bg-[#EBEBEB] p-[12px]">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={bookCoverImage(story)}
                                                        alt="card-image"
                                                        className="w-full h-[220px] object-cover rounded-[24px]"
                                                        unoptimized
                                                    />
                                                    <div className="p-[12px] pt-[16px]">
                                                        <h3 className="text-[#2B282F] candal-font text-[20px] font-normal leading-normal tracking-[-0.8px]">{story?.title}</h3>
                                                        <div className="flex items-center gap-[18px] justify-between mt-[8px]">
                                                            <span className="text-[#6F6A77] text-center font-[Poppins] text-[14px] font-medium leading-normal">Last Edited: {printDateTime(story?.updatedAt)}</span>
                                                            <Image
                                                                width={24}
                                                                height={24}
                                                                src="/assets/images/right-arrow.svg"
                                                                alt="card-image"
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            })
                                        }
                                    </div>
                                </> : <>
                                    <div className="flex items-center flex-col justify-center">
                                        <p className="text-white text-center text-[20px] mb-5 mt-[50px] w-full">No stories found</p>
                                    </div>
                                </>
                            }
                        </>
                    }
                </div>
            </section>
        </>
    );
}
