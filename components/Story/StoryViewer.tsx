"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

import SceneEditor from "@/components/Story/SceneEditor";

import Image from "next/image";
import { useStory } from "@/context/StoryContext";

type StoryViewerProps = {
    editMode?: boolean
}

export default function StoryViewer({ editMode = true }: StoryViewerProps) {

    const { story, saveUpdatedStory } = useStory();

    const bookRef = useRef<any>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (story && story?.scenes) {
            setTotalPages(story.scenes.length);
        }
    }, [story]);

    const flipPrev = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipPrev();
        }
    }

    const flipNext = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipNext();
        }
    }

    const onFlip = (e: any) => {
        setPage(e.data);
    };

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
            saveUpdatedStory(tempStory);
        }, 500);
    };

    return (
        <>
            <div className={`${editMode ? 'editor-mode' : 'viewer-mode'} story-viewer-box flex-1 container mx-auto relative z-10 flex justify-center mb-5 md:mt-[36px] mt-[15px]`}>
                <div className="flex flex-col items-center justify-start md:px-6 w-full md:py-8 mx-auto lg:py-0">

                    <div className="story-viewer-main-box w-full bg-[#ebebeb10] rounded-[48px] w-full p-[15px] md:p-[20px]">
                        <div className="book-viewer-wrapper">
                            {story?.scenes && story?.scenes.length > 0 ? (
                                <>
                                    <div className="book-viewer">
                                        <div className="book-viewer-pagination pre">
                                            <Image
                                                onClick={flipPrev}
                                                width={100}
                                                height={100}
                                                src="/assets/images/next-icon.svg"
                                                className={`next-icon prev ${page <= 0 ? 'disabled' : ''}`}
                                                alt="next-icon"
                                            />
                                        </div>
                                        <div className="book-viewer-view">
                                            {/* @ts-ignore */}
                                            <HTMLFlipBook
                                                ref={bookRef}
                                                onFlip={onFlip}
                                                width={1200}
                                                height={550}
                                                swipeDistance={0} // Disable swipe on touch
                                                clickEventForward={false} // Disable clicking to flip
                                                useMouseEvents={false} // Disable mouse dragging
                                            >
                                                {story.scenes.map((scene: Scene, index: number) => {
                                                    return (
                                                        <div
                                                            key={`scene-${index}`}
                                                            className="w-full"
                                                        >
                                                            <SceneEditor
                                                                editMode={editMode}
                                                                scene={scene}
                                                                onSceneUpdate={(updatesScene) => handleSceneUpdate(updatesScene, index)}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </HTMLFlipBook>
                                        </div>
                                        <div className="book-viewer-pagination next">
                                            <Image
                                                onClick={flipNext}
                                                width={100}
                                                height={100}
                                                src="/assets/images/next-icon.svg"
                                                className={`next-icon ${page >= (totalPages - 1) ? 'disabled' : ''}`}
                                                alt="next-icon"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
