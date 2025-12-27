import Image from "next/image";
import Spinner from "../Common/Spinner";

export default function ContentLoader({ loadingText = "Loading..." }) {
    return (
        <>
            <div className="flex-1 container mx-auto relative z-10 flex justify-center mb-5 md:mt-[36px] mt-[15px] ">
                <div className="flex flex-col items-center justify-start w-full">
                    <div className="w-full bg-[#ebebeb10] rounded-[48px] w-full">
                        <div className="space-y-4 md:space-y-6 p-5 bg-[#EBEBEB] rounded-[34px] relative overflow-hidden">
                            <div className="flex flex-col my-[50px] gap-[12px] relative z-1">
                                <Spinner/>
                                <h2 className="text-[#2B1354] text-center  candal-font font-normal text-[16px] md:text-[25px] leading-normal tracking-[-1.36px]">{loadingText}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
