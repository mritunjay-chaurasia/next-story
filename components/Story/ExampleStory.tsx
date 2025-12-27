"use client";

import { getPublicStory } from "@/services/public-service";
import { error } from "console";
import { useEffect, useState } from "react";
import StoryViewer from "./StoryViewer";
import { StoryProvider } from "@/context/StoryContext";

export default function ExampleStory() {

  const [showExampleBox, setShowExampleBox] = useState(false);
  const [story, setStory] = useState(null);

  useEffect(() => {
    getPublicStory().then((res: any) => {
      setStory(res?.data);
      setShowExampleBox(true);
    }).catch((error: any) => {
      setShowExampleBox(false);
    });
  }, []);

  if (!showExampleBox || !story) {
    return null;
  }

  return (
    <>
      <section className="examples bg-[#3E216E] pt-[43px] pb-[100px] mt-[97px]">
        <div className="container mx-auto">
          <h2 className="text-[#EBEBEB] text-center candal-font md:text-[54px] text-[40px] font-normal leading-[108%] tracking-[-2.16px] mb-[84px]">Story Example</h2>
        </div>
        <StoryProvider initialStory={story}>
          <StoryViewer editMode={false} />
        </StoryProvider>
      </section>
    </>
  );

}
