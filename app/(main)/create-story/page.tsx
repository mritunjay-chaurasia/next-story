import StoryForm from "@/components/Story/StoryForm";

export default function CreateStory() {
  return (
    <>
      <div className="flex-1 container mx-auto relative z-10 flex justify-center mb-5 md:mt-[36px] mt-[15px] ">
        <div className="flex flex-col items-center justify-start md:px-6 w-full md:py-8 mx-auto lg:py-0">
          <div className="w-full bg-[#ebebeb10] rounded-[48px] w-full p-[15px] md:p-[20px]">
            <div className="md:py-[24px] p-[15px] md:px-[34px] space-y-4 md:space-y-6  bg-[#EBEBEB] rounded-[34px] relative overflow-hidden">
              <StoryForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
