import Image from "next/image";

export default function StoryCreatingLoader() {
    return (
        <>
            <div className=" md:p-[100px] flex flex-col gap-[34px] items-center">
                <Image
                    width={200}
                    height={200}
                    alt="loader"
                    src="/assets/images/loader.svg"
                    className="animate-spin"
                />
                <div className="flex flex-col gap-[12px] relative z-1">
                    <h2 className="text-[#2B1354] text-center  candal-font font-normal text-[24px] md:text-[34px] leading-normal tracking-[-1.36px]">Generating Book, This may take up to 15 Minutes!</h2>
                    <p className="text-[#6F6A77] text-center font-sans font-medium text-base leading-normal">We are currently generating your book. We will email you with the link once your book is ready. </p>
                </div>
                <Image
                    width={1000}
                    height={300}
                    alt="loader"
                    src="/assets/images/loader-flow.svg"
                    className="loader-flow"
                />
            </div>
        </>
    );
}
