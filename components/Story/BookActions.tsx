"use client";

import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStory } from "@/context/StoryContext";

type BookActionsProp = {}

const BookActions = ({ }: BookActionsProp) => {

  const { story, setOpenUpdateCoverModal, setOpenDownloadModal } = useStory();
  const { slug } = useParams();

  if (!story) {
    return null;
  }

  return (
    <>
      <div className="md:flex justify-between w-full mb-[18px] md:mb-[30px]">
        <h1 className="text-[#EBEBEB] candal-font  font-normal text-[28px] md:text-[34px] leading-normal tracking-[-1.36px] mb-[18px] md:mb-0">
          My Book
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-[12px] md:gap-[18px]">
          <Link
            prefetch
            href={`/my-stories/edit/${slug}`}
            className="rounded-[40px] w-full bg-[#EBEBEB] w-fit flex items-center justify-center py-[12px] md:py-[15px] px-[24px] gap-[12px] cursor-pointer"
          >
            <Image
              width={24}
              height={24}
              alt="edit icon"
              src="/assets/images/edit-img.svg"
              className="w-[24px] h-[24px]"
            />
            <span className="text-[#2B1354] font-sans font-medium text-base leading-normal whitespace-nowrap">
              Edit Book
            </span>
          </Link>
          <Button
            onClick={() => setOpenUpdateCoverModal(true)}
            className="rounded-[40px] w-full bg-[#EBEBEB] w-fit flex items-center justify-center py-[12px] md:py-[15px] px-[24px] gap-[12px] cursor-pointer">
            <Image
              width={24}
              height={24}
              alt="edit icon"
              src="/assets/images/update-cover.svg"
              className="w-[24px] h-[24px]"
            />
            <span className="text-[#2B1354] font-sans font-medium text-base leading-normal whitespace-nowrap">
              Update Cover
            </span>
          </Button>
          <Button
            onClick={() => setOpenDownloadModal(true)}
            className={`rounded-[40px] w-full bg-[#EBEBEB] w-fit flex items-center justify-center py-[12px] md:py-[15px] px-[24px] gap-[12px] cursor-pointer`}
          >
            <Image
              width={24}
              height={24}
              alt="edit icon"
              src="/assets/images/download-book.svg"
              className="w-[24px] h-[24px]"
            />
            <span className="text-[#2B1354] font-sans font-medium text-base leading-normal whitespace-nowrap">
              Download Book
            </span>
          </Button>
        </div>
      </div>

    </>
  );

};

export default BookActions;
