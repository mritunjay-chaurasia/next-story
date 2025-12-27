"use client";

import { characterSchema, storySchema } from "@/lib/validations";
import { createBackendUrl } from "@/utils/helpers";
import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";

type CharacterFormData = z.infer<typeof characterSchema>;
type StoryFormData = z.infer<typeof storySchema>;

type AboutStoryProps = {
  creatingStory: boolean;
  storyData?: StoryFormData | undefined;
  story?: Story | undefined;
  addCharacter: () => void;
  onSelectCharacter: (index: number) => void;
  onRemoveCharacter: (index: number) => void;
  characters: CharacterFormData[];
  onSave: (data: StoryFormData, generate: boolean) => void;
  isEdit: boolean;
};

export default function AboutStory({
  creatingStory,
  storyData,
  addCharacter,
  onSelectCharacter,
  onRemoveCharacter,
  characters,
  onSave,
  isEdit = false,
  story = undefined
}: AboutStoryProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: storyData,
  });

  const [showAlertModal, setShowAlertModal] = useState(false);

  // console.log(errors, control)

  useEffect(() => {
    reset(story);
  }, [story]);

  // Watch for field changes
  const formData: any | undefined = useWatch({ control });

  // Trigger onSave when form data changes
  useEffect(() => {
    onSave(formData, false);
  }, [formData]);

  const onSubmit = (data: StoryFormData) => {
    if (characters && characters.length > 0) {
      onSave(data, true);
    } else {
      toast.error("Select at-least one character");
    }
  };

  const submitForm = () => {
    setShowAlertModal(false);
    handleSubmit(onSubmit)();
  }

  return (
    <>
      <form className={`${isEdit ? 'mt-5' : ''}`} onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[#2B282F] font-sans text-[18px] md:text-[22px] font-normal leading-normal tracking-[-0.88px] candal-font mb-[18px]">
          {!isEdit ? 'Step 1: ' : ''}Provide an overview of your story
        </h1>
        <div className={`${isEdit ? 'md:py-[10px] py-[8px] px-4' : 'md:p-[24px] p-[8px] py-[15px]'} md:py-[24px] bg-[#E1E1E1] rounded-[24px] mb-[31px]`}>
          <div className="mb-[18px]">
            <input
              type="text"
              {...register("title")}
              placeholder="Title of Book"
              className="bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-[18px]">
            <textarea
              {...register("description")}
              placeholder="Story Description - The story will be crafted based on this. Tell us with as much detail as possible about what you want to be included in the story."
              className="bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[34px] py-[17px] px-[24px] focus:outline-none min-h-[150px]"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="md:mb-[18px]">
            <textarea
              {...register("message")}
              placeholder="Dedication - Write a personal message..."
              className="bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[34px] py-[17px] px-[24px] focus:outline-none min-h-[150px]"
            ></textarea>
          </div>

          <div className="md:mb-[18px] flex items-center">
            <input type="checkbox" {...register("rhyming")} id="rhymingWord" />
            <label htmlFor="rhymingWord" className="ml-[10px] text-[#6F6A77]">
              Create a Rhyming Story (with rhyming couplets)
            </label>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-[18px] md:items-center justify-between mb-[34px]">
          <h2 className="text-[#2B282F] font-sans text-[18px] md:text-[22px] font-normal leading-normal tracking-[-0.88px] candal-font">
            {!isEdit ? 'Step 2: ' : ''}Add the character(s) to your story
          </h2>
          <button
            onClick={addCharacter}
            className="bg-[#2B1354] rounded-[40px] p-[6px] flex items-center gap-[18px] pr-[44px] text-white cursor-pointer w-full md:w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
            >
              <circle cx="21" cy="21" r="21" fill="#C4CD24" />
              <path
                d="M21 29C20.858 29 20.739 28.952 20.643 28.856C20.547 28.76 20.4993 28.6413 20.5 28.5V21.5H13.5C13.358 21.5 13.2393 21.452 13.144 21.356C13.0487 21.26 13.0007 21.141 13 20.999C12.9993 20.857 13.0473 20.7383 13.144 20.643C13.2407 20.5477 13.3593 20.5 13.5 20.5H20.5V13.5C20.5 13.358 20.548 13.2393 20.644 13.144C20.74 13.0487 20.859 13.0007 21.001 13C21.143 12.9993 21.2617 13.0473 21.357 13.144C21.4523 13.2407 21.5 13.3593 21.5 13.5V20.5H28.5C28.642 20.5 28.7607 20.548 28.856 20.644C28.9513 20.74 28.9993 20.859 29 21.001C29.0007 21.143 28.9527 21.2617 28.856 21.357C28.7593 21.4523 28.6407 21.5 28.5 21.5H21.5V28.5C21.5 28.642 21.452 28.7607 21.356 28.856C21.26 28.9513 21.141 28.9993 20.999 29"
                fill="#2B1354"
              />
            </svg>
            <span>Add Character</span>
          </button>
        </div>
        {characters && characters.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]">
              {characters.map((character, index) => {
                return (
                  <div
                    key={`character-${index}`}
                    className="rounded-[24px] py-[12px] px-[18px] bg-[#fff] flex items-center justify-between gap-[10px] w-full"
                  >
                    <div className="flex items-center gap-[18px]">
                      <Image
                        src={createBackendUrl(character?.characterImage)}
                        height={60}
                        width={60}
                        alt="charactor image"
                        className="w-[60px] h-[60px] object-cover  border border-red-500 rounded-full"
                        unoptimized
                      />
                      <p
                        onClick={() => onSelectCharacter(index)}
                        className="flex flex-col gap-[8px]"
                      >
                        <span className="text-[#6F6A77] font-poppins text-[14px] font-normal leading-normal">
                          Character {index + 1}
                        </span>
                        <span className="text-[#2B282F] font-poppins text-[18px] font-medium leading-normal flex items-center">
                          <span>{character?.name}</span>
                          <span>{">"}</span>
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveCharacter(index)}
                      className="cursor-pointer"
                    >
                      <Image
                        src="/assets/images/cross.svg"
                        height={24}
                        width={24}
                        alt="charactor image"
                        className="w-[24px] h-[24px] object-cover"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="rounded-[24px] py-[12px] px-[18px] bg-[#e1e1e1] flex items-center justify-between gap-[10px] pr-[40px] w-fit">
              <Image
                src="/assets/images/dummy-char.svg"
                height={60}
                width={60}
                alt="charactor image"
                className="w-[60px] h-[60px] object-cover"
              />
              <span>No Character Added</span>
            </div>
          </>
        )}
        {!isEdit && (
          <button
            disabled={creatingStory}
            type="submit"
            className="mt-4 bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
          >
            {creatingStory ? <>Please wait...</> : <>Continue & Generate</>}
          </button>
        )}
        {isEdit && (
          <div className="flex items-center mt-[35px] gap-2">
            {
              (story?.totalEdits ?? 0) >= (story?.editsAllowed ?? 0) ? <>
                <p className="text-center w-full mb-5">
                  No more edits allowed
                </p>
              </> : <>
                <button
                  onClick={() => setShowAlertModal(true)}
                  disabled={creatingStory}
                  type="button"
                  id="updateStoryModalBtn"
                  className="flex items-center w-[200px] justify-center bg-[#C4CD24] rounded-[40px] py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
                >
                  {
                    creatingStory ? <>
                      <Image
                        src="/assets/images/regenrate-simple.svg"
                        width={24}
                        height={24}
                        alt="icon"
                        className="animate-spin w-[24px] h-[24px] blackimg object-cover me-2"
                      />
                      <span>Please wait...</span>
                    </> : <>
                      <Image
                        src="/assets/images/regenrate-simple.svg"
                        width={24}
                        height={24}
                        alt="icon"
                        className="w-[24px] h-[24px] blackimg object-cover me-2"
                      />
                      <span>Update Book</span>
                    </>
                  }
                </button>
                <h4 className="m-0 p-4 text-[18px]">{story?.totalEdits}/{story?.editsAllowed}</h4>
              </>
            }
          </div>
        )}

        <Dialog
          open={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto w-full md:w-[750px] rounded-[34px] bg-white p-6 shadow-lg relative">
              <button
                onClick={() => setShowAlertModal(false)}
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
                <h3 className="text-[#2B282F] mb-0 candal-font font-normal text-[22px] leading-normal tracking-[-0.88px]">Are You Sure You want to Regenerate The Story?</h3>
                <p className="text-[#6F6A77] font-poppins text-[16px] font-semibold leading-normal mb-[0px]">
                  By clicking “Yes” you will not be able to revert the changes made to your story
                </p>
                <div className="flex gap-2 px-3">
                  <button
                    onClick={() => setShowAlertModal(false)}
                    className="bg-[#2B1354] w-full p-[15px] text-[#fff] rounded-[40px] cursor-pointer text-[#EBEBEB] text-center font-poppins text-[16px] font-medium leading-normal flex items-center justify-center gap-[12px] mt-[18px]">
                    <span>No, Go Back</span>
                  </button>
                  <button
                    onClick={submitForm}
                    type="button"
                    className="bg-[#C4CD24] w-full p-[15px] text-[#333] rounded-[40px] cursor-pointer text-[#333] text-center font-poppins text-[16px] font-medium leading-normal flex items-center justify-center gap-[12px] mt-[18px]"
                  >
                    <span>Yes, Regenerate</span>
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>


      </form>
    </>
  );
}
