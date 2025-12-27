"use client";

import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { generateNewAIImage, regenrateStoryCover, regenerateCharacter } from "@/services/story-service";
import { createBackendUrl } from "@/utils/helpers";
import SmartImage from "../Common/SmartImage";
import ButtonLoader from "../Common/ButtonLoader";
import FrontCoverLayoutEditor from "./FrontCoverLayoutEditor";
type CharacterImagePrompt = {
  characterId: string;
  image: string;
  transparentImage: string;
  imagePrompt: string;
  _id: string;
};

type Story = {
  _id: string;
  coverHtml?: string;
  characterImagePrompts?: {
    characterId: string;
    image: string;
    transparentImage: string;
    imagePrompt: string;
    _id: string;
  }[];
  characters?: {
    _id: string;
    leonardoMediaId: string;
  }[];
};

type RegenerateImageProp = {
  story: Story | undefined;
  title: string;
  currentImage: string;
  onSave: (newImagePath: string) => void;
  showModal: boolean;
  onModalHide: () => void;
  prompt?: string;
  saveLoading?: boolean;
}

const RegenerateImage = ({ story, title, currentImage, onSave, showModal, onModalHide, prompt = "", saveLoading = false }: RegenerateImageProp) => {

  const [image, setImage] = useState(currentImage);
  const [charPrompts, setCharPrompts] = useState<CharacterImagePrompt[]>(story?.characterImagePrompts ?? []);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [editloading, setEditloading] = useState(false)
  const [showFrontCoverLayoutModal, setShowFrontCoverLayoutModal] = useState(false);
  useEffect(() => {
    if (story?.characterImagePrompts) {
      setCharPrompts([...story.characterImagePrompts]);
    }
  }, [story, showModal]);

  const onHideModal = () => {
    onModalHide();
  }

  const handlePromptChange = (index: number, newPrompt: string) => {
    const updated = [...charPrompts];
    updated[index].imagePrompt = newPrompt;
    setCharPrompts(updated);
  };

  const handleregenerateCharacter = (index: number) => {
    const CharacterImagePrompt = charPrompts[index];
    console.log("handleregenerateCharacter function called");
    if (!CharacterImagePrompt.imagePrompt || !CharacterImagePrompt.characterId) {
      return toast.error("Missing prompt or character ID");
    }
    if (!story?._id) {
      return toast.error("Story ID is missing");
    }
    setLoadingIndex(index);
    regenerateCharacter(story._id, {
      prompt: CharacterImagePrompt.imagePrompt,
      characterId: CharacterImagePrompt.characterId,
    })
      .then((res: any) => {
        const updated = [...charPrompts];
        updated[index].image = res.data.image;
        setCharPrompts(updated);
      })
      .catch((err: any) => {
        toast.error(err?.message ?? "Failed to regenerate image");
      })
      .finally(() => {
        setLoadingIndex(null);
      });
  };
  console.log("story", story);

  const regenerateCoverImage = () => {
    if (!story?._id) {
      return toast.error("Story ID is missing");
    }

    setLoading(true);

    regenrateStoryCover(story._id)
      .then((res: any) => {
        if (res?.data?.coverImage) {
          setImage(res.data.coverImage);
          onSave(res.data.coverImage);
        } else {
          console.warn("Response structure unexpected:", res);
          toast.error("No image returned from AI generator");
        }
      })
      .catch((err: any) => {
        console.error("Image regeneration error:", err);
        toast.error(err?.message ?? "Failed to regenerate image");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveImage = () => {
    console.log("image", image);
    onSave(image);
  }

  if (!story) {
    return null;
  }

  const handleEditLayout = (scene: any) => {
    // setSceneToEdit(scene);

    setShowFrontCoverLayoutModal(true);
  }

  const handleNewGenerateImageSave = (newImagePath: string) => {
    if (newImagePath) {
      setShowFrontCoverLayoutModal(false);
      setEditloading(false);
      onSave(newImagePath)
    }
  }

  return (
    <>
      <Dialog
        open={showModal}
        onClose={onHideModal}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full md:w-[750px] max-h-[90vh] rounded-[34px] bg-white p-6 shadow-lg relative flex flex-col">
            <button
              onClick={onHideModal}
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
            <Dialog.Title className="text-[#2B282F] candal-font font-normal text-[22px] mb-4">
              {title}
            </Dialog.Title>
            <p>This will override the existing layout changes of cover, you will need to re-do layout changes if you done any.</p>
            <div className="overflow-y-auto pr-2 custom-scroll max-h-[calc(100vh-280px)]">
              {charPrompts.map((charPrompt, index) => (
                <div key={charPrompt._id} className="mt-[24px] grid grid-cols-3 gap-[18px]">
                  <div className="col-span-1 relative">
                    <SmartImage
                      alt="character-image"
                      src={createBackendUrl(charPrompt.image)}
                      className="w-full"
                      width={150}
                      height={150}
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="bg-[#D8D8D8] py-[9px] px-[24px] w-full rounded-[34px]">
                      <p className="text-[#6F6A77] font-poppins text-[11px] font-semibold mb-[8px]">
                        Prompt
                      </p>
                      <textarea
                        value={charPrompt.imagePrompt}
                        onChange={(e) => handlePromptChange(index, e.target.value)}
                        className="bg-transparent w-full min-h-[100px] outline-none font-poppins text-[16px] font-medium"
                      />
                    </div>

                    <button
                      onClick={() => handleregenerateCharacter(index)}
                      className="w-full flex items-center justify-center bg-[#C4CD24] mx-3 my-3 rounded-[40px] p-[15px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
                    >
                      {loadingIndex === index ? (
                        <>
                          <Image
                            src="/assets/images/regenrate-simple.svg"
                            width={20}
                            height={20}
                            alt="loading"
                            className="animate-spin blackimg me-2"
                          />
                          <span>Regenerating...</span>
                        </>
                      ) : (
                        <>
                          <Image
                            src="/assets/images/regenrate-simple.svg"
                            width={20}
                            height={20}
                            alt="icon"
                            className="blackimg me-2"
                          />
                          <span>Regenerate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={regenerateCoverImage}
              className="flex items-center bg-[#2B1354] w-full px-[20px] py-[15px] text-[#fff] rounded-[40px] mt-[18px] justify-center gap-[12px] text-base leading-none border-t-[1px] border-b-[1px] border-[#2B1354]"
            >
              {
                loading ? (
                  <>
                    <Image
                      src="/assets/images/regenrate-simple.svg"
                      width={24}
                      height={24}
                      alt="icon"
                      className="animate-spin"
                    />
                    <span className="mt-[2px]">Regenerating...</span>
                  </>
                ) : (
                  <>
                    <Image
                      src="/assets/images/regenrate-simple.svg"
                      width={24}
                      height={24}
                      alt="icon"
                    />
                    <span className="mt-[2px]">Regenerate Cover Image</span>
                  </>
                )
              }
            </button>



            <p className="text-center text-[#2B1354] my-[12px] font-medium">or</p>

            <button onClick={handleEditLayout} className="flex items-center bg-white w-full h-[56px] p-[15px] text-[#2B1354] rounded-[40px] justify-center gap-[12px] border border-[#2B1354] text-base leading-none">
              {
                editloading ? <>
                  <Image
                    src="/assets/images/regenrate-simple.svg"
                    width={24}
                    height={24}
                    alt="icon"
                    className="animate-spin"
                  />
                  <span>Editing...</span>
                </> : <>
                  <Image
                    width={24}
                    height={24}
                    alt="icon"
                    src="/assets/images/edit-content-icon-fixed.svg"
                    className="w-[24px] h-[24px] mt-[-1px]"
                  />
                  <span>Edit Layout</span>
                </>
              }
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      {
        showFrontCoverLayoutModal ? <>
          <FrontCoverLayoutEditor
            story={story}
            showModal={showFrontCoverLayoutModal}
            onModalHide={() => setShowFrontCoverLayoutModal(false)}
            onSave={handleNewGenerateImageSave}
          />
        </> : null
      }
    </>
  );

};

export default RegenerateImage;
