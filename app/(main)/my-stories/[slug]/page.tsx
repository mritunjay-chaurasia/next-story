"use client";

import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getStory, regenrateStory, regenrateStoryCover } from "@/services/story-service";
import toast from "react-hot-toast";
import StoryCreatingLoader from "@/components/Story/StoryCreatingLoader";
import BookActions from "@/components/Story/BookActions";
import CheckoutScreen from "@/components/Story/CheckoutScreen";
import StoryViewer from "@/components/Story/StoryViewer";
import { StoryProvider } from "@/context/StoryContext";
import StoryModals from "@/components/Story/StoryModals";
import ContentLoader from "@/components/Loader/ContentLoader";

export default function MyStory({ }) {

  const { slug } = useParams();
  const router = useRouter();

  const [storyReady, setStoryReady] = useState(false);

  const [storyLoading, setStoryLoading] = useState(true);
  const [story, setStory] = useState<Story | undefined>(undefined);

  const checkStoryReadyState = (storyData: Story | undefined) => {
    if (storyData) {
      if (
        storyData?.status === "creating"
        || storyData?.status === "awaitingPayment"
        || (!storyData?.scenes)
        || (storyData?.scenes && (storyData?.scenes?.length ?? 0) <= 0)
      ) {
        setStoryReady(false);
        return false;
      } else {
        setStoryReady(true);
        return true;
      }
    } else {
      setStoryReady(false);
      return false;
    }
  }

  const fetchStory = (showLoading = true) => {
    if (showLoading) {
      setStoryLoading(true);
    }
    getStory(slug)
      .then((res: any) => {
        setStory(res?.data);
        if (!checkStoryReadyState(res?.data)) {
          setTimeout(() => {
            fetchStory(false);
          }, 10000);
        }
      })
      .catch((err) => {
        toast.error(err?.message ?? "Failed to load story");
        router.push("/my-stories");
      })
      .finally(() => {
        setStoryLoading(false);
      });
  };

  useEffect(() => {
    if (slug) {
      fetchStory();
    }
  }, [slug]);

  const regenerate = async () => {
    await regenrateStory(story?._id);
  };

  const regenerateCover = async () => {
    await regenrateStoryCover(story?._id);
  };

  useEffect(() => {
    checkStoryReadyState(story);
  }, [story]);

  return (
    <>

      <div className="hidden">
        <Button
          onClick={regenerate}
          className="p-[6px] w-full pl-[24px] flex items-center justify-between gap-[18px] bg-[#2B1354] rounded-[40px]"
        >
          <span className="text-[#EBEBEB] font-poppins text-[16px] font-medium leading-normal">
            Regenrate Story
          </span>
        </Button>
        <Button
          onClick={regenerateCover}
          className="p-[6px] w-full pl-[24px] flex items-center justify-between gap-[18px] bg-[#2B1354] rounded-[40px]"
        >
          <span className="text-[#EBEBEB] font-poppins text-[16px] font-medium leading-normal">
            Regenrate Cover
          </span>
        </Button>
      </div>

      {
        storyLoading || !story?._id ? <>

          <ContentLoader loadingText="Loading your book..." />

        </> : <>

          {
            storyReady ? <>

              <StoryProvider initialStory={story}>

                <div className="flex-1 container mx-auto relative z-10 flex justify-center mb-5 md:mt-[36px] mt-[15px] ">
                  <div className="flex flex-col items-center justify-start md:px-6 w-full">

                    <BookActions />

                    <div className="w-full bg-[#ebebeb10] rounded-[48px] w-full">
                      <div className="space-y-4 md:space-y-6  bg-[#EBEBEB] rounded-[34px] relative overflow-hidden">
                        {
                          story.status === "awaitingPayment" ? <>

                            <div className="w-full py-[50px]">
                              <CheckoutScreen
                                story={story}
                              />
                            </div>

                          </> : <>

                            <StoryViewer />
                            <StoryModals />

                          </>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </StoryProvider>

            </> : <>

              <div className="flex-1 container mx-auto relative z-10 flex justify-center mb-5 md:mt-[36px] mt-[15px] ">
                <div className="flex flex-col items-center justify-start md:px-6 w-full">

                  <div className="w-full bg-[#ebebeb10] rounded-[48px] w-full">
                    <div className="space-y-4 md:space-y-6  bg-[#EBEBEB] rounded-[34px] relative overflow-hidden">

                      {
                        story.status === "awaitingPayment" ? <>

                          <div className="w-full py-[50px]">
                            <CheckoutScreen
                              story={story}
                            />
                          </div>

                        </> : <>

                          {story.status === "creating" ? (
                            <>

                              <div className="w-full py-[25px]">
                                <StoryCreatingLoader />
                              </div>

                            </>
                          ) : null}
                        </>
                      }

                    </div>
                  </div>
                </div>
              </div>

            </>
          }

        </>
      }
    </>
  );
}
