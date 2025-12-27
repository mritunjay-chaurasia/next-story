"use client";

import { characterSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { uploadMedia } from "@/services/user-service";
import toast from "react-hot-toast";
import { createBackendUrl } from "@/utils/helpers";
import SmartImage from "../Common/SmartImage";

type CharacterFormData = z.infer<typeof characterSchema>;

type CharacterFormProps = {
  character?: CharacterFormData;
  handleBack: () => void;
  handleSave: (characterDetails: CharacterFormData) => void;
  originalCharacters: CharacterFormData[];
  characters: CharacterFormData[];
  isEdit?: boolean
};

export default function CharacterForm({
  character,
  handleBack,
  handleSave,
  originalCharacters,
  characters,
  isEdit = false
}: CharacterFormProps) {

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [characterImage, setCharacterImage] = useState("");
  const [showOldCharacter, setShowOldCharacter] = useState(false);

  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterFormData | null>(null);

  useEffect(() => {
    if (character) {
      setCharacterImage(character.characterImage || "");
      reset(character);
    }
  }, [character]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema),
  });

  const characterType = useWatch({
    control,
    name: "characterType",
    defaultValue: undefined,
  });

  const onSubmit = (data: CharacterFormData) => {
    if (characterImage != "") {
      handleSave({
        ...data,
        characterImage,
      });
      reset();
      setSelectedCharacter(null);
      setCharacterImage("");
    } else {
      toast.error("Character Image is required!");
    }
  };

  useEffect(() => {
    if (selectedCharacter && characterImage !== "") {
      let alreadyPresent = false;
      characters.map((character) => {
        if (character?._id === selectedCharacter?._id) {
          alreadyPresent = true;
        }
      });
      if (alreadyPresent) {
        toast.error("Character already selected");
      } else {
        onSubmit(selectedCharacter);
      }
      setSelectedCharacter(null); // clean up
    }
  }, [characterImage]);

  const selectOldCharacter = (data: any) => {
    setSelectedCharacter(data);
    setCharacterImage(data?.characterImage);
  };

  const handleUploadTrigger = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImageUploading(true);
      uploadMedia({ file })
        .then((res: any) => {
          setCharacterImage(res?.data?.url ?? "");
        })
        .catch((error) => {
          toast.error(error?.message ?? "Failed to upload image")
        })
        .finally(() => {
          setImageUploading(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        });
    }
  };

  const toggleCharacterSelect = () => {
    setShowOldCharacter((prev) => !prev);
  };

  return (
    <>
      <form className={`${isEdit ? 'relative pt-[100px]' : ''}`} onSubmit={handleSubmit(onSubmit)}>
        <button className="back-btn cursor-pointer" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
          >
            <circle
              cx="28"
              cy="28"
              r="28"
              transform="matrix(-1 0 0 1 56 0)"
              fill="#C4CD24"
            />
            <path
              d="M37 28L19 28M19 28L27.5 36.5M19 28L27.5 19.5"
              stroke="#2B1354"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[34px]">
          Add Character
        </h1>
        <div className="flex items-center justify-center">
          {originalCharacters &&
            Array.isArray(originalCharacters) &&
            originalCharacters?.length > 0 &&
            (showOldCharacter ? (
              <button
                type="button"
                className="bg-[#C4CD24] my-3 rounded-[40px] p-[30px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
                onClick={toggleCharacterSelect}
              >
                Add New Character
              </button>
            ) : (

              <button
                type="button"
                className="bg-[#C4CD24] my-3 rounded-[40px] p-[30px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
                onClick={toggleCharacterSelect}
              >
                Select from Old Character
              </button>

            ))}
        </div>
        {showOldCharacter ? (
          <div>
            <h4 className="mb-3">Select an old character</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]">
              {
                originalCharacters && originalCharacters.length > 0 ? <>
                  {originalCharacters.map((character, index) => (
                    <div
                      key={`character-${index}`}
                      className="rounded-[24px] py-[12px] px-[18px] bg-[#fff] flex items-center justify-between gap-[10px] w-full"
                      onClick={(e) => selectOldCharacter(character)}
                    >
                      <div className="flex items-center gap-[18px]">
                        <Image
                          src={
                            character?.characterImage
                              ? createBackendUrl(character?.characterImage)
                              : "/assets/images/dummy-char.svg"
                          }
                          height={60}
                          width={60}
                          alt="charactor image"
                          className="w-[60px] h-[60px] object-cover  border border-red-500 rounded-full"
                          unoptimized
                        />
                        <p className="flex flex-col gap-[8px]">
                          <span className="text-[#6F6A77] font-poppins text-[14px] font-normal leading-normal">
                            Character {index + 1}
                          </span>
                          <span className="text-[#2B282F] font-poppins text-[18px] font-medium leading-normal flex items-center">
                            <span>{character?.name}</span>
                            <span>{">"}</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </> : <>
                  <p className="w-full text-center">No Old Characters found, please create one.</p>
                </>
              }
            </div>
          </div>
        ) : (
          <div>
            <h4 className="mb-3">Create new character</h4>
            <div className="rounded-[24px] grid grid-cols-1 md:grid-cols-2 gap-[18px] mb-0">
              <div>
                <input
                  {...register("name")}
                  placeholder="Name"
                  className="w-full bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <select
                  {...register("characterType")}
                  className="w-full bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none"
                >
                  <option value="">Character Type</option>
                  <option value="human">Human</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="other">Other</option>
                </select>
                {errors.characterType && (
                  <p className="text-red-500">{errors.characterType.message}</p>
                )}
              </div>
            </div>
            {characterType === "human" && (
              <>
                <div className="rounded-[24px] grid grid-cols-1 md:grid-cols-2 gap-[18px] mb-0 my-4">
                  <div>
                    <input
                      type="number"
                      {...register("age")}
                      placeholder="Age"
                      className="w-full bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none"
                    />
                    {/* @ts-ignore */}
                    {errors.age && (
                      <>
                        {/* @ts-ignore */}
                        <p className="text-red-500">{errors.age.message}</p>
                      </>
                    )}
                  </div>
                  <div>
                    <select
                      {...register("gender")}
                      className="w-full bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {/* @ts-ignore */}
                    {errors.gender && (
                      <>
                        {/* @ts-ignore */}
                        <p className="text-red-500">{errors.gender.message}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-[24px] grid grid-cols-1 md:grid-cols-3 gap-[18px] mb-0 my-4">
                  <div>
                    <select
                      {...register("ethnicity")}
                      className="w-full bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none"
                    >
                      <option value="">Select Ethnicity</option>
                      <option value="white">White</option>
                      <option value="black">Black</option>
                      <option value="asian">Asian</option>
                      <option value="hispanic">Hispanic</option>
                      <option value="middle eastern">Middle Eastern</option>
                      <option value="latino">Latino</option>
                      <option value="indian">Indian</option>
                      <option value="other">Other</option>
                    </select>
                    {/* @ts-ignore */}
                    {errors.ethnicity && (
                      <>
                        {/* @ts-ignore */}
                        <p className="text-red-500">{errors.ethnicity.message}</p>
                      </>
                    )}
                  </div>
                  <div>
                    <select
                      {...register("hairColor")}
                      className="w-full bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none"
                    >
                      <option value="">Select Hair Color</option>
                      <option value="black">Black</option>
                      <option value="brown">Brown</option>
                      <option value="blonde">Blonde</option>
                      <option value="red">Red</option>
                      <option value="gray">Gray</option>
                      <option value="other">Other</option>
                    </select>
                    {/* @ts-ignore */}
                    {errors.hairColor && (
                      <p className="text-red-500">
                        {/* @ts-ignore */}
                        {errors.hairColor.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <select
                      {...register("hairLength")}
                      className="w-full bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none"
                    >
                      <option value="">Select Hair Length</option>
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                    {/* @ts-ignore */}
                    {errors.hairLength && (
                      <p className="text-red-500">
                        {/* @ts-ignore */}
                        {errors.hairLength.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {characterType !== undefined &&
              characterType !== "other" &&
              characterType !== "human" && (
                <>
                  <div className="mt-5">
                    <textarea
                      {...register("breed")}
                      placeholder={`Provide breed of ${characterType}`}
                      className="w-full md:col-span-2 bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[24px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none h-[100px] resize-none"
                    />
                    {/* @ts-ignore */}
                    {errors.breed && (
                      <p className="text-red-500">
                        {/* @ts-ignore */}
                        {errors.breed.message}
                      </p>
                    )}
                  </div>
                </>
              )}

            <div className="my-4">
              <textarea
                rows={2}
                {...register("characterAttributes")}
                placeholder="Describe your character attributes"
                className="w-full md:col-span-2 bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal rounded-[24px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none h-[100px] resize-none"
              />
              <p className="text-[#6F6A77] font-poppins text-[14px] !italic font-medium leading-normal mt-[8px] mb-0">
                Describe your character attributes above
              </p>
              {errors.characterAttributes && (
                <p className="text-red-500">
                  {errors.characterAttributes.message}
                </p>
              )}
            </div>
            <h2 className="text-[#2B282F] font-sans text-[18px] md:text-[22px] font-normal leading-normal tracking-[-0.88px] candal-font mt-[24px] mb-[18px]">
              Character Image
            </h2>
            <div className="grid md:grid-cols-1 gap-[18px]">
              <div className="rounded-[24px] p-[24px] bg-[#fff] flex flex-col gap-[18px] items-center">
                <div className="w-[74px] h-[74px] full-round">
                  <SmartImage
                    width={74}
                    height={74}
                    alt="icon"
                    src={
                      characterImage != ""
                        ? createBackendUrl(characterImage)
                        : "/assets/images/upload.svg"
                    }
                    className="w-[74px] h-[74px] object-cover rounded-full"
                    onClick={handleUploadTrigger}
                  />
                </div>
                <p className="text-[#6F6A77] text-center font-poppins text-[16px] !italic font-normal leading-[124%]">
                  Add an image and our AI will generate a character that looks
                  like the reference image. Upload a clear photo for best
                  results.
                </p>
                <p>
                  Note: Your photo will only be used for Generating AI
                  resemblance and will not be shared, stored, or misused in any
                  way.
                </p>
                <button
                  disabled={imageUploading}
                  type="button"
                  onClick={handleUploadTrigger}
                  className="flex items-center justify-center bg-[#2B1354] w-full p-[15px] text-[#fff] rounded-[40px] cursor-pointer text-[#EBEBEB] text-center font-poppins text-[16px] font-medium leading-normal"
                >
                  {imageUploading ? <>
                    <Image
                      src="/assets/images/regenrate-simple.svg"
                      width={24}
                      height={24}
                      alt="icon"
                      className="animate-spin w-[24px] h-[24px] object-cover me-2"
                    />
                    Uploading...
                  </> : <>
                    Upload an Image
                  </>}
                </button>
              </div>
            </div>
            <input
              onChange={handleFileChange}
              type="file"
              ref={fileInputRef}
              className="hidden"
            />
            <button
              type="submit"
              className="bg-[#C4CD24] mt-3 rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </>
  );
}
