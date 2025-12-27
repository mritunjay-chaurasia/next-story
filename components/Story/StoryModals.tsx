"use client";

import { useStory } from "@/context/StoryContext";
import StoryHardCopyBuyModal from "./StoryHardCopyBuyModal";
import RegenerateImage from "./RegenerateImage";
import { bookCoverImage } from "@/utils/helpers";
import StoryDownloadModal from "./StoryDownloadModal";
import { useState } from "react";
import { updateCoverImage } from "@/services/story-service";
import toast from "react-hot-toast";

type StoryModalsProps = {}

export default function StoryModals({ }: StoryModalsProps) {

  const {
    story,
    loadStory,
    openBuyHardCopyModal,
    setOpenBuyHardCopyModal,
    openDownloadModal,
    setOpenDownloadModal,
    openUpdateCoverModal,
    setOpenUpdateCoverModal
  } = useStory();

  const [updatingCoverLoading, setUpdatingCoverLoading] = useState(false);

  const handleCoverUpdated = (newImagePath: string) => {
    if (story?._id) {
      setUpdatingCoverLoading(true);
      updateCoverImage(story?._id, {
        image: newImagePath
      }).then(() => {
        toast.success("Cover image has been updated");
        loadStory();
        setUpdatingCoverLoading(false);
        setOpenUpdateCoverModal(false);
      }).catch(() => {
        toast.error("Failed to update cover image");
        setUpdatingCoverLoading(false);
      });
    }
  }

  return (
    <>

      {
        openBuyHardCopyModal ? <>
          <StoryHardCopyBuyModal
            onClose={() => setOpenBuyHardCopyModal(false)}
          />
        </> : null
      }

      {
        openDownloadModal ? <>
          <StoryDownloadModal
            onClose={() => setOpenDownloadModal(false)}
          />
        </> : null
      }

      {
        openUpdateCoverModal ? <>
          <RegenerateImage
            story={story}
            title="Regenerate Cover Image"
            currentImage={bookCoverImage(story)}
            onSave={handleCoverUpdated}
            showModal={true}
            onModalHide={() => setOpenUpdateCoverModal(false)}
            prompt=""
            saveLoading={updatingCoverLoading}
          />
        </> : null
      }

    </>
  );
}
