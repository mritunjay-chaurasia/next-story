"use client";

import { Button } from "@headlessui/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { bookCoverImage, createBackendUrl } from "@/utils/helpers";
import { Fragment, useEffect, useState } from "react";
import ImageEditor from "../image-editor/ImageEditor";
import RegenerateImage from "./RegenerateImage";
import RegenerateStoryImage from "./RegenerateStoryImage";
import TextEditor from "../TextEditor";
import SmartImage from "../Common/SmartImage";
import StoryFrontCover from "./StoryFrontCover";
import { useStory } from "@/context/StoryContext";
import StoryBackCover from "./StoryBackCover";
import TextEditorViewer from "../TextEditor/TextEditorViewer";
import FrontCoverLayoutEditor from "./FrontCoverLayoutEditor";
type SceneEditorProp = {
  mode?: string
  scene: Scene
  editMode?: boolean
  onSceneUpdate: (storyScene: Scene) => void;
}

const SceneEditor = ({ mode = "inline", editMode = true, scene, onSceneUpdate }: SceneEditorProp) => {

  const { story }: any = useStory();

  const [storyScene, setStoryScene] = useState<Scene>(scene);
  const [editImage, setEditImage] = useState(false);

  const [showFrontCoverLayoutModal, setShowFrontCoverLayoutModal] = useState(false);

  const [editContent, setEditContent] = useState("");
  const [editStoryContent, setEditStoryContent] = useState(false);

  const [editLeftContent, setLeftEditContent] = useState("");
  const [editLeftStoryContent, setLeftEditStoryContent] = useState(false);

  const [regenratemodal, setRegenrateModal] = useState(false);
  const [imagePrompt, setImagePrompt] = useState(scene?.imagePrompt ?? "");

  const [sceneImage, setSceneImage] = useState("/scene-default-image.png");
  const [sceneBase64Image, setSceneBase64Image] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [regenrateImageModal, setRegenrateImageModal] = useState(false);
  const [sceneToEdit, setSceneToEdit] = useState<Scene | null>(null);

  const [updatedhtml, setUpdatedhtml] = useState<string | null>(null);

  useEffect(() => {
    setStoryScene(scene);
    setImagePrompt(scene?.imagePrompt);
    setSceneImage(storyScene.image ? createBackendUrl(storyScene.image) : "/scene-default-image.png");
  }, [scene]);

  // useEffect(() => {
  //   console.log("storyScene", storyScene);
  // }, [storyScene])

  const fetchAndConvertToBase64 = async () => {
    try {
      const response = await fetch(sceneImage);
      const blob = await response.blob();
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSceneBase64Image(reader.result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error converting AWS S3 image to Base64:', error);
    }
  };

  useEffect(() => {
    if (!sceneImage) return;
    fetchAndConvertToBase64();
  }, [sceneImage]);

  const handleRegenerateCoverImage = (scene: any) => {
    setSceneToEdit(scene);
    setRegenrateModal(true);
  }

  const handleEditLayout = (scene: any) => {
    setSceneToEdit(scene);
    setShowFrontCoverLayoutModal(true);
  }

  const handleStartRegenerateImage = (scene: any) => {
    setSceneToEdit(scene);
    setRegenrateImageModal(true);
  }

  const handleStartEditImage = () => {
    setEditImage(true);
  };

  const handleCancleEditImage = () => {
    setEditImage(false);
  };

  const updateSceneData = (updatedSceneData: Scene) => {
    setStoryScene((scene) => {
      const updatedScene = {
        ...scene,
        ...updatedSceneData
      };
      onSceneUpdate(updatedScene);
      return updatedScene;
    });
  }

  const handleSaveEditImage = (newImagePath: string) => {
    console.log(newImagePath);
    updateSceneData({
      ...scene,
      image: newImagePath,
      scene_images: [...(scene.scene_images || []), newImagePath],
    });
    setEditImage(false);
  }

  const handleNewGenerateImageSave = (newImagePath: string) => {
    console.log("handleNewGenerateImageSave called",)
    updateSceneData({
      ...scene,
      image: newImagePath,
      scene_images: [...(scene.scene_images || []), newImagePath],
    });
    setRegenrateModal(false);
    setShowFrontCoverLayoutModal(false);
    setRegenrateImageModal(false);
  }

  const handleSceneImageChange = (index: number) => {
    console.log("scene image", scene.scene_images[index]);
    updateSceneData({
      ...scene,
      image: scene.scene_images[index]
    });
  };

  const handleStartEdit = () => {
    setEditContent(storyScene.scene);
    setEditStoryContent(true);
  };

  const handleCancelEdit = () => {
    setEditContent("");
    setEditStoryContent(false);
  };

  const handleEditContent = () => {
    updateSceneData({
      ...scene,
      scene: editContent
    });
    setEditContent("");
    setEditStoryContent(false);
  };


  const handleLeftStartEdit = () => {
    setLeftEditContent(storyScene.scene_html ?? "");
    setLeftEditStoryContent(true);
  };

  const handleLeftCancelEdit = () => {
    setLeftEditContent("");
    setLeftEditStoryContent(false);
  };

  const handleLeftEditContent = () => {
    updateSceneData({
      ...scene,
      scene_html: editLeftContent
    });
    setLeftEditContent("");
    setLeftEditStoryContent(false);
  };

  return (
    <>

      <div className={`scene-editor-box relative overflow-hidden ${scene?.type}`}>
        <div className={`${(scene?.type === "front_cover" || scene?.type === "back_cover") ? 'one-item-box' : ''} scene-editor-box-item grid md:grid-cols-2 grid-cols-1`}>

          {
            editMode && mode === "inline" && scene?.type === "front_cover" ? <>
              <div className="relative scene-editor-box-dynamic-box scene-editor-box-data-item">
                <StoryFrontCover />
              </div>
            </> : null
          }

          {
            scene?.scene_html ? <>

              {
                scene?.scene_html === "blank_page" ? <>

                  <div className="scene-editor-box-empty-box scene-left-side scene-editor-box-data-item mx-auto w-full h-[700px] bg-[#fff] flex flex-col items-center justify-center p-[18px] md:p-[34px] relative pb-[80px]">
                    <p className="text-[20px] text-[#999]">This page will be empty</p>
                  </div>

                </> : <>

                  <div className={`${scene?.type} scene-left-side scene-editor-box-content-box scene-editor-box-data-item mx-auto w-full h-[700px] bg-[#FFFFFF] flex flex-col items-center justify-center p-[18px] md:p-[34px] relative pb-[80px]`}>
                    <div className={`scene-editor-box-layer w-full h-full ${editLeftStoryContent ? "py-[18px] px-[24px] bg-[#EBEBEB] rounded-[34px]" : ""}`}>

                      {editLeftStoryContent ? (
                        <TextEditor
                          editContent={editLeftContent}
                          setEditContent={setLeftEditContent}
                        />
                      ) : (
                        <>
                          <TextEditorViewer value={storyScene?.scene_html ?? ""} />
                        </>
                      )}

                      {
                        editMode ? <>
                          {editLeftStoryContent ? (
                            <>
                              <div className="scene-editor-actions flex items-center gap-[10px] justify-end mt-[34px]">
                                <Button
                                  className="w-fit rounded-[40px] bg-[#D8D8D8] flex items-center py-[15px] px-[30px] justify-center gap-[12px] text-[#2B1354] text-[16px] font-medium leading-normal cursor-pointer "
                                  onClick={handleLeftCancelEdit}
                                >
                                  <span>Cancel</span>
                                </Button>
                                <Button
                                  className="w-fit rounded-[40px] bg-[#C4CD24] flex items-center py-[15px] px-[30px] justify-center gap-[12px] text-[#2B1354] text-[16px] font-medium leading-normal cursor-pointer "
                                  onClick={handleLeftEditContent}
                                >
                                  <span>Save</span>
                                </Button>
                              </div>
                            </>
                          ) : (
                            <Button
                              className="scene-editor-actions w-fit rounded-[40px] bg-[#EBEBEB] flex items-center p-[15px] bg-[#EBEBEB] justify-center gap-[12px] text-[#2B1354] text-[16px] font-medium leading-normal cursor-pointer edit-content-btn"
                              onClick={handleLeftStartEdit}
                            >
                              <Image
                                width={24}
                                height={24}
                                alt="icon"
                                src="/assets/images/edit-content-icon.svg"
                                className="w-[24px] h-[24px]"
                              />
                              <span>Edit Content</span>
                            </Button>
                          )}
                        </> : null
                      }

                    </div>
                  </div>

                </>
              }

            </> : null
          }

          {
            scene?.type !== "end" ? <>

              {
                scene?.scene ? <>

                  {
                    scene?.scene === "blank_page" ? <>

                      <div className="scene-editor-box-empty-box scene-left-side scene-editor-box-data-item mx-auto w-full h-[700px] bg-[#fff] flex flex-col items-center justify-center p-[18px] md:p-[34px] relative pb-[80px]">
                        <p className="text-[20px] text-[#999]">This page will be empty</p>
                      </div>

                    </> : <>

                      <div className={`${scene?.type} scene-right-side scene-editor-box-content-box scene-editor-box-data-item mx-auto w-full h-[700px] bg-[#FFF] flex flex-col items-center justify-center p-[18px] md:p-[34px] relative pb-[80px]`}>

                        {
                          scene?.type === "back_cover" ? <>
                            <div className="scene-editor-back-cover-image" style={{ background: `url('/assets/images/background-image.png')` }}></div>
                          </> : null
                        }

                        <div className={`scene-editor-box-layer w-full h-full ${editStoryContent ? "py-[18px] px-[24px] bg-[#EBEBEB] rounded-[34px]" : ""}`}>
                          {editStoryContent ? (
                            <TextEditor
                              editContent={editContent}
                              setEditContent={setEditContent}
                            />
                          ) : (
                            <>
                              <TextEditorViewer value={storyScene?.scene ?? ""} />
                            </>
                          )}

                          {
                            editMode ? <>
                              {editStoryContent ? (
                                <>
                                  <div className="scene-editor-actions flex items-center gap-[10px] justify-end mt-[34px]">
                                    <Button
                                      className="w-fit rounded-[40px] bg-[#D8D8D8] flex items-center py-[15px] px-[30px] justify-center gap-[12px] text-[#2B1354] text-[16px] font-medium leading-normal cursor-pointer "
                                      onClick={handleCancelEdit}
                                    >
                                      <span>Cancel</span>
                                    </Button>
                                    <Button
                                      className="w-fit rounded-[40px] bg-[#C4CD24] flex items-center py-[15px] px-[30px] justify-center gap-[12px] text-[#2B1354] text-[16px] font-medium leading-normal cursor-pointer "
                                      onClick={handleEditContent}
                                    >
                                      <span>Save</span>
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <Button
                                  className="scene-editor-actions w-fit rounded-[40px] bg-[#EBEBEB] flex items-center p-[15px] bg-[#EBEBEB] justify-center gap-[12px] text-[#2B1354] text-[16px] font-medium leading-normal cursor-pointer edit-content-btn"
                                  onClick={handleStartEdit}
                                >
                                  <Image
                                    width={24}
                                    height={24}
                                    alt="icon"
                                    src="/assets/images/edit-content-icon.svg"
                                    className="w-[24px] h-[24px]"
                                  />
                                  <span>Edit Content</span>
                                </Button>
                              )}
                            </> : null
                          }

                        </div>
                      </div>

                    </>
                  }

                </> : null
              }

              {
                scene?.image ? <>
                  <div className="relative bg-[#fff] scene-right-side scene-editor-box-image-box scene-editor-box-data-item">

                    {editImage ? (
                      <ImageEditor
                        image={sceneBase64Image}
                        handleCancel={handleCancleEditImage}
                        handleSave={handleSaveEditImage}
                      />
                    ) : (
                      <>
                        <div className="w-fit bg-[#EBEBEB] py-[4px] rounded-[12px] previous-cover-btns">
                          {editMode && storyScene?.scene_images &&
                            !editImage &&
                            storyScene?.scene_images.map((scene_image, index) => {
                              return (
                                <Fragment key={`scene-btn-${index}`}>
                                  <Button
                                    className={`${createBackendUrl(scene_image) === sceneImage ? 'active' : ''} previous-cover-image-option border border-[#2B1354] mx-1 p-[4px] rounded-[7px] cursor-pointer`}
                                    onClick={() => handleSceneImageChange(index)}
                                  >
                                    <Image
                                      width={38}
                                      height={38}
                                      alt="book-cover-image"
                                      src={createBackendUrl(scene_image)}
                                      className="w-[38px] h-[38px] object-cover rounded-[5px]"
                                      unoptimized
                                    />
                                  </Button>
                                </Fragment>
                              );
                            })}
                        </div>
                        <div
                          className="book-cover-scene-container"
                        >
                          <SmartImage
                            alt="book-cover-image"
                            src={sceneImage}
                            className="w-full h-[500px] object-cover"
                            width={650}
                            height={650}
                          />
                        </div>
                      </>
                    )}

                    {
                      editMode && scene?.type !== "front_cover" ? <>
                        {!editImage && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-[11px] book-cover-action">
                            <Button
                              className="w-full rounded-[40px] bg-[#EBEBEB] flex items-center p-[12px] bg-[#EBEBEB] justify-center gap-[12px] text-[#2B1354] text-[14px] font-medium leading-normal cursor-pointer"
                              onClick={handleStartEditImage}
                            >
                              <Image
                                width={24}
                                height={24}
                                alt="icon"
                                src="/assets/images/shapes-btn-icon.svg"
                                className="w-[24px] h-[24px]"
                              />
                              <span>Text Bubble</span>
                              <Image
                                width={7}
                                height={12}
                                alt="icon"
                                src="/assets/images/next-line-icon.svg"
                                className="w-[7px] h-[12px]"
                              />
                            </Button>
                            <Button
                              onClick={() => handleStartRegenerateImage(scene)}
                              className="w-full rounded-[40px] bg-[#EBEBEB] flex items-center p-[12px] bg-[#EBEBEB] justify-center gap-[12px] text-[#2B1354] text-[14px] font-medium leading-normal cursor-pointer">
                              <Image
                                width={24}
                                height={24}
                                alt="icon"
                                src="/assets/images/regenrate-icon-on-book.svg"
                                className="w-[24px] h-[24px]"
                              />
                              <span>Regenerate Image</span>
                            </Button>
                          </div>
                        )}
                      </> : null
                    }

                    {
                      scene?.type === "front_cover" ? <>
                        {!editImage && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-[11px] book-cover-action">
                            <Button
                              onClick={() => handleEditLayout(scene)}
                              className="w-full rounded-[40px] bg-[#EBEBEB] flex items-center p-[12px] bg-[#EBEBEB] justify-center gap-[12px] text-[#2B1354] text-[14px] font-medium leading-normal cursor-pointer">
                              <Image
                                width={24}
                                height={24}
                                alt="icon"
                                src="/assets/images/edit-content-icon.svg"
                                className="w-[24px] h-[24px]"
                              />
                              <span>Edit Layout</span>
                            </Button>
                            <Button
                              onClick={() => handleRegenerateCoverImage(scene)}
                              className="w-full rounded-[40px] bg-[#EBEBEB] flex items-center p-[12px] bg-[#EBEBEB] justify-center gap-[12px] text-[#2B1354] text-[14px] font-medium leading-normal cursor-pointer">
                              <Image
                                width={24}
                                height={24}
                                alt="icon"
                                src="/assets/images/regenrate-icon-on-book.svg"
                                className="w-[24px] h-[24px]"
                              />
                              <span>Regenerate Images</span>
                            </Button>
                          </div>
                        )}
                      </> : null}
                  </div>
                </> : null
              }

            </> : <>

              <div className="scene-editor-box-empty-box scene-right-side scene-editor-box-data-item mx-auto w-full h-[700px] bg-[#fff] flex flex-col items-center justify-center p-[18px] md:p-[34px] relative pb-[80px]">
                <p className="text-[20px] text-[#999]">This page will be empty</p>
              </div>

            </>
          }

          {
            editMode && mode === "inline" && scene?.type === "back_cover" ? <>
              <div className="relative scene-editor-box-dynamic-box scene-editor-box-data-item">
                <StoryBackCover />
              </div>
            </> : null
          }

        </div>
      </div>

      {
        regenratemodal ? <>
          <RegenerateImage
            story={story}
            title="Regenerate Image"
            currentImage={sceneImage}
            onSave={handleNewGenerateImageSave}
            showModal={regenratemodal}
            onModalHide={() => setRegenrateModal(false)}
            prompt={imagePrompt}
          />
        </> : null
      }

      {regenrateImageModal && sceneToEdit && (
        <RegenerateStoryImage
          sceneData={{
            _id: story._id,
            characterId: scene.character,
            image: scene.image,
            imagePrompt: scene.imagePrompt,
          }}
          showModal={regenrateImageModal}
          onClose={() => setRegenrateImageModal(false)}
          onSave={handleNewGenerateImageSave}
        />
      )}

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

export default SceneEditor;
