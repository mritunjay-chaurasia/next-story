"use client";

import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { payForStory } from "@/services/story-service";
import { printAmount } from "@/utils/helpers";
import { useUser } from "@/context/UserContext";
import Spinner from "@/components/Common/Spinner";
import ButtonLoader from "@/components/Common/ButtonLoader";
import { useStory } from "@/context/StoryContext";

type StoryHardCopyBuyModalProps = {
    onClose: () => void
}

export default function StoryHardCopyBuyModal({ onClose }: StoryHardCopyBuyModalProps) {

    const { story, loadStory } = useStory();

    const [loading, setLoading] = useState(false);

    const [hardCopyPrice, setHardCopyPrice] = useState(null);
    const { configurations } = useUser();

    const [hardCopyPurchasedLink, setHardCopyPurchasedLink] = useState(null);
    const [hardCopyPurchasedStarted, setHardCopyPurchasedStarted] = useState(false);

    const loadBookData = () => {
        if (!story?.hardCopyPurchase) {
            loadStory();
        }
    }

    useEffect(() => {
        loadBookData();
        const intervalId = setInterval(() => {
            loadBookData();
        }, 5 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (configurations?.prices) {
            setHardCopyPrice(configurations?.prices?.hardCopyPrice);
        }
    }, [configurations]);

    const onPurchaseStart = () => {
        setHardCopyPurchasedStarted(true);
    }

    const buyHardCopy = () => {
        if (story?._id) {
            setLoading(true);
            setHardCopyPurchasedLink(null);
            setHardCopyPurchasedStarted(false);
            payForStory(story._id, {
                type: "hardCopy"
            }).then((res: any) => {
                // setHardCopyPurchasedLink(res.data.url);
                window.location.replace(res.data.url);
            }).catch((err: any) => {
                console.log("Payment failed:", err);
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <>
            <Dialog
                open={true}
                onClose={handleClose}
                className="relative z-50"
            >
                <div
                    className="fixed inset-0 bg-black/30"
                    aria-hidden="true"
                />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-full md:w-[750px] rounded-[34px] bg-white p-6 shadow-lg relative">
                        <button
                            onClick={handleClose}
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
                        <Dialog.Title className="text-[#2B282F] candal-font font-normal text-[22px] leading-normal tracking-[-0.88px]">
                            Checkout
                        </Dialog.Title>
                        {
                            story.hardCopyPurchase ? <>

                                <div className="text-center flex flex-col items-center justify-center pt-4">
                                    <Image
                                        width={34}
                                        height={34}
                                        src="/assets/images/purchased.png"
                                        alt="edit-icon"
                                    />
                                    <p className="p-5 text-center">Hard copy has been puchased.</p>
                                </div>

                            </> : <>

                                {
                                    hardCopyPurchasedStarted ? <>

                                        <div className="max-w-[600px] mx-auto">
                                            <div className="w-full flex items-center justify-center mb-[24px]">
                                                <span className="text-[#2B282F] block font-sans text-center font-medium text-[14px] md:text-[16px] leading-normal ml-[12px]">
                                                    Please wait we are verifying your payment.
                                                </span>
                                            </div>
                                            <Spinner />
                                            <div className="mt-5 w-full flex items-center justify-center">
                                                <span className="text-[#2B282F] block font-sans text-center font-medium text-[14px] md:text-[16px] leading-normal ml-[12px]">
                                                    If your payment fails or not completed you can retry by clicking below button.
                                                </span>
                                            </div>
                                            <button
                                                disabled={loading}
                                                onClick={buyHardCopy}
                                                type="button"
                                                className="bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer mt-[24px]"
                                            >
                                                Retry Payment
                                            </button>
                                        </div>

                                    </> : <>

                                        <div className="rounded-[24px] py-[18px] px-[24px] bg-[#E1E1E1] mt-[24px]">
                                            <h2 className="text-[#2B282F] font-sans text-[18px] md:text-[22px] font-normal leading-normal tracking-[-0.88px] candal-font mb-[24px]">
                                                Payment Summary
                                            </h2>
                                            <ul>
                                                <li className="flex items-start gap-[18px] justify-between w-full mb-[12px]">
                                                    <span className="text-[#6F6A77] font-sans font-medium text-base leading-normal">
                                                        Hard Copy
                                                    </span>
                                                    <span className="text-[#2B282F] text-right font-sans font-medium text-base leading-normal">
                                                        {printAmount(hardCopyPrice)}
                                                    </span>
                                                </li>
                                            </ul>
                                            <div className="border-t border-[#C5C5C5] mt-[16px] pt-[16px]">
                                                <p className="flex items-start gap-[18px] justify-between w-full mb-[12px]">
                                                    <span className="text-[#6F6A77] font-sans font-medium text-base leading-normal">
                                                        Grand Total
                                                    </span>
                                                    <span className="text-[#2B282F] text-right font-sans font-bold text-base leading-normal">
                                                        {printAmount(hardCopyPrice)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        {
                                            hardCopyPurchasedLink ? <>
                                                <div className="max-w-[600px] mx-auto">
                                                    <div className="w-full flex mt-5 items-center mb-[24px]">
                                                        <span className="text-[#2B282F] font-sans text-center font-medium text-[14px] md:text-[16px] leading-normal ml-[12px]">
                                                            Please click the below button to pay now, once payment is successful, you can close that window and come back here to check status.
                                                        </span>
                                                    </div>
                                                    <a
                                                        target="_blank"
                                                        onClick={onPurchaseStart}
                                                        href={hardCopyPurchasedLink}
                                                        className="bg-[#C4CD24] block rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer mt-[24px]"
                                                    >
                                                        Click to Pay Now
                                                    </a>
                                                </div>
                                            </> : <>
                                                <button
                                                    disabled={loading}
                                                    type="submit"
                                                    onClick={buyHardCopy}
                                                    className="flex align-center justify-center bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer mt-[24px]"
                                                >
                                                    {loading ? <ButtonLoader dark={true} loading={true} /> : null}
                                                    {loading ? "Please wait..." : "Proceed to Pay"}
                                                </button>
                                            </>
                                        }
                                    </>
                                }

                            </>
                        }
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
