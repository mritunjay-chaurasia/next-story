"use client";

import { useEffect, useState } from "react";
import SceneEditor from "@/components/Story/SceneEditor";
import { returnSceneTypeTitle } from "@/utils/helpers";
import { useStory } from "@/context/StoryContext";
import Image from "next/image";

export default function StoryEditor() {

    const { story, storySaving, saveUpdatedStory } = useStory();

    const [savingStory, setSavingStory] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSceneUpdate = (updatedScene: Scene, index: number) => {
        if (!story) return false;
        let tempStory = { ...story };
        const updatedScenes = [...tempStory.scenes];
        updatedScenes[index] = updatedScene;
        tempStory = {
            ...tempStory,
            scenes: updatedScenes,
        };
        setTimeout(() => {
            saveUpdatedStory(tempStory, false);
        }, 500);
    };

    const saveStory = () => {
        saveUpdatedStory(story);
    }

    useEffect(() => {
        countPages();
    }, [story]);

    const countPages = () => {
        let scenePages = story?.scenes?.length ?? 0;
        scenePages++;
        setTotalPages(scenePages);
    }

    return (
        <>
            <div className="bg-[#EBEBEB] p-[12px] md:pt-[20px] md:p-[35px] rounded-[24px] mt-[18px] md:mt-[24px]">
                <div className="flex align-center w-full">
                    <h2 className="text-[#2B282F] py-3 mr-3 candal-font text-[22px] font-normal leading-normal tracking-[-0.88px]">
                        Pages
                    </h2>
                    <div className="page-actions mr-0 ml-auto">
                        <button
                            id="saveStoryBtn"
                            type="button"
                            className="flex bg-[#C4CD24] rounded-[40px] p-[15px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer"
                            onClick={saveStory}
                            disabled={storySaving}
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
                <div className="flex flex-col gap-[12px] items-center">

                    {story?.scenes &&
                        story?.scenes.map((scene, index) => (
                            <div key={`${index}-scene-pages`} className="bg-[#E1E1E1] p-[12px] md:p-[24px] rounded-[24px] mt-[18px] w-full">
                                <div className="flex gap-[18px] flex-col md:flex-row justify-between items-center mb-[18px]">
                                    <h2 className="text-[#2B282F] candal-font text-[22px] font-normal leading-normal tracking-[-0.88px]">
                                        {returnSceneTypeTitle(scene?.type, scene?.title ?? `Scene ${index + 1}`)}
                                    </h2>
                                </div>

                                <SceneEditor
                                    mode="editor"
                                    scene={scene}
                                    onSceneUpdate={(updatesScene) => handleSceneUpdate(updatesScene, index)}
                                />

                            </div>
                        ))}

                </div>
            </div>
        </>
    );
}
