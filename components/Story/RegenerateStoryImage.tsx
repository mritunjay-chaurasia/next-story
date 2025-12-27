// components/Modals/CustomCharacterRegenerateModal.tsx
"use client";

import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { generateNewAIImage } from "@/services/story-service";
import { createBackendUrl } from "@/utils/helpers";
import SmartImage from "../Common/SmartImage";

type SceneData = {
    _id: string; // story ID
    image?: string;
    imagePrompt: string;
    characterId?: string;
};

type CustomCharacterRegenerateModalProps = {
    sceneData: SceneData;
    showModal: boolean;
    onClose: () => void;
    onSave: (updatedImagePath: string) => void;
};

const RegenerateStoryImage = ({
    sceneData,
    showModal,
    onClose,
    onSave,
}: CustomCharacterRegenerateModalProps) => {
    const [prompt, setPrompt] = useState(sceneData.imagePrompt);
    const [image, setImage] = useState(sceneData.image);
    const [loading, setLoading] = useState(false);
    const handleRegenerate = () => {
        if (!sceneData._id || !sceneData.characterId || !prompt) {
            return toast.error("Missing required data.");
        }

        setLoading(true);
        generateNewAIImage(sceneData._id, {
            prompt,
            characterId: sceneData.characterId,
        })
            .then((res: any) => {
                if (res?.data?.image) {
                    setImage(res?.data?.image);
                    toast.success("Image regenerated!");
                } else {
                    toast.error("No image returned.");
                }
            })
            .catch((err) => {
                toast.error(err?.message ?? "Error generating image.");
            })
            .finally(() => setLoading(false));
    };

    const handleSave = () => {
        if (image) {
            onSave(image);
            onClose();
        }
    };

    return (
        <Dialog open={showModal} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full md:w-[750px] max-h-[90vh] rounded-[34px] bg-white p-6 shadow-lg relative flex flex-col">
                    <button
                        onClick={onClose}
                        className="absolute top-[24px] right-[24px]"
                    >
                        <Image
                            src="/assets/images/modal-close.svg"
                            width={24}
                            height={24}
                            alt="close"
                        />
                    </button>

                    <Dialog.Title className="text-[#2B282F] candal-font font-normal text-[22px] mb-4">
                        Regenerate Image
                    </Dialog.Title>

                    <div className="grid grid-cols-3 gap-[18px]">
                        <div className="col-span-1">
                            <SmartImage
                                alt="character-image"
                                src={createBackendUrl(image)}
                                className="w-full"
                                width={150}
                                height={150}
                            />
                        </div>

                        <div className="col-span-2">
                            <div className="bg-[#D8D8D8] py-[9px] px-[24px] w-full rounded-[34px]">
                                <p className="text-[#6F6A77] text-[11px] font-semibold mb-[8px]">
                                    Prompt
                                </p>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="bg-transparent w-full min-h-[100px] outline-none text-[16px] font-medium"
                                />
                            </div>

                            <button
                                onClick={handleRegenerate}
                                className="bg-[#2B1354] w-full p-[15px] text-white rounded-[40px] mt-[18px] flex items-center justify-center gap-[12px]"
                            >
                                {loading ? (
                                    <>
                                        <Image
                                            src="/assets/images/regenrate-simple.svg"
                                            width={24}
                                            height={24}
                                            alt="loading"
                                            className="animate-spin"
                                        />
                                        <span>Regenerating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src="/assets/images/regenrate-simple.svg"
                                            width={24}
                                            height={24}
                                            alt="icon"
                                        />
                                        <span>Regenerate</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-[#C4CD24] mt-6 py-[17px] w-full text-[#2B1354] rounded-[40px] font-medium text-base"
                    >
                        Save
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default RegenerateStoryImage;
