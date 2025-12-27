"use client";

import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { regenrateStoryCover, getStoryFrontCoverEditor } from "@/services/story-service";
import ContentLoader from "../Loader/ContentLoader";

type Story = {
  _id: string;
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
  onSave: (newImagePath: string) => void;
  showModal: boolean;
  onModalHide: () => void;
  saveLoading?: boolean;
}

const FrontCoverLayoutEditor = ({ story, onSave, showModal, onModalHide, saveLoading = false }: RegenerateImageProp) => {

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(false);

  const [coverHtml, setCoverHtml] = useState("");

  const onHideModal = () => {
    onModalHide();
  }

  const getIframeHTML = (): string | null => {
    if (!iframeRef.current) return null;

    try {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      return doc?.documentElement?.outerHTML || null;
    } catch (e) {
      console.error("Failed to get iframe content:", e);
      return null;
    }
  };

  const saveCoverImage = () => {
    if (!story?._id) {
      return toast.error("Story ID is missing");
    }

    const updatedHtml = getIframeHTML();

    if (!updatedHtml) {
      return toast.error("Failed to get updated layout");
    }

    setLoading(true);
    regenrateStoryCover(story._id, {
      coverHtml: updatedHtml
    })
      .then((res: any) => {
        if (res?.data?.coverImage) {
          onSave(res.data.coverImage);
        } else {
          toast.error("No image returned from AI generator");
        }
      })
      .catch((err: any) => {
        toast.error(err?.message ?? "Failed to regenerate image");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (story?._id) {
      getStoryFrontCoverEditor(story._id).then((res: any) => {
        setCoverHtml(res ?? "");
      });
    }
  }, [story]);

  if (!story) {
    return null;
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
          <Dialog.Panel className="mx-auto w-full md:w-[80%] max-h-[90vh] rounded-[34px] bg-white p-6 shadow-lg relative flex flex-col">
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
              Edit Cover Layout
            </Dialog.Title>

            <div className="overflow-y-auto pr-2 custom-scroll max-h-[calc(100vh-280px)]">
              <p>Drag images to reposition them. Once saved, edits can't be made—you'll need to start over.</p>
              {
                coverHtml ? <>
                  <div className="story-cover-iframe-wrapper">
                    <iframe
                      ref={iframeRef}
                      srcDoc={coverHtml}
                      height={512}
                      width={512}
                      frameBorder="0"
                      sandbox="allow-scripts allow-same-origin"
                    ></iframe>
                  </div>
                </> : <>
                  <ContentLoader loadingText="Loading Editor..." />
                </>
              }
            </div>

            <button disabled={loading} onClick={saveCoverImage} className="flex bg-center items-center bg-[#2B1354] p-[15px] text-[#fff] rounded-[40px] mt-[18px] flex items-center justify-center gap-[12px]">
              {
                loading ? <>
                  <Image
                    src="/assets/images/regenrate-simple.svg"
                    width={20}
                    height={20}
                    alt="icon"
                    className="animate-spin"
                  />
                  <span>Saving...</span>
                </> : <>
                  <Image
                    src="/assets/images/regenrate-simple.svg"
                    width={20}
                    height={20}
                    alt="icon"
                  />
                  <span>Save</span>
                </>
              }
            </button>

          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );

};

export default FrontCoverLayoutEditor;
