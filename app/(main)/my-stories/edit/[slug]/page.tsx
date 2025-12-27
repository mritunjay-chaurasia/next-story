"use client";


import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getStory,
} from "@/services/story-service";
import { StoryProvider } from "@/context/StoryContext";
import StoryEditScreen from "@/components/Screens/StoryEditScreen";
import ContentLoader from "@/components/Loader/ContentLoader";

export default function BookEditPage() {

  const { slug } = useParams();
  const router = useRouter();

  const [story, setStory] = useState<Story | undefined>(undefined);
  const [loadingStory, setLoadingStory] = useState(false);

  const fetchStory = (showLoading = true) => {
    if (showLoading) {
      setLoadingStory(true);
    }
    getStory(slug)
      .then((res: any) => {
        setStory(res?.data);
        if (res?.data?.status === "creating") {
          router.push("/my-stories");
        }
      })
      .catch((err) => {
        toast.error(err?.message ?? "Failed to load story");
      }).finally(() => {
        setLoadingStory(false);
      });
  };

  useEffect(() => {
    if (slug) {
      fetchStory();
    }
  }, [slug]);

  return (
    <>
      <div className="flex-1 container mx-auto relative z-10 flex justify-center mb-5 md:mt-[36px] mt-[15px] ">
        <div className="flex flex-col items-center justify-start md:px-6 w-full md:py-8 mx-auto lg:py-0">

          {loadingStory || !story ? (
            <>
              <ContentLoader loadingText="Loading your book in edit mode..." />
            </>
          ) : (
            <>

              <StoryProvider initialStory={story}>

                <StoryEditScreen />

              </StoryProvider>

            </>
          )
          }

        </div>
      </div >
    </>
  );
}
