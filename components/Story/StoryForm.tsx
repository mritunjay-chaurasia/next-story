"use client";

import { useEffect, useState } from "react";
import AboutStory from "./AboutStory";
import CharacterForm from "./CharacterForm";
import { characterSchema, storySchema } from "@/lib/validations";
import { z } from "zod";
import { createStory, fetchUserCharactersReq, regenrateStory } from "@/services/story-service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CharacterFormData = z.infer<typeof characterSchema>;
type StoryFormData = z.infer<typeof storySchema>;

type StoryFormProps = {
  story?: Story | undefined
}

export default function StoryForm({ story = undefined }: StoryFormProps) {
  const router = useRouter();

  const [showCharacterForm, setShowCharacterForm] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterFormData[]>([]);
  const [originalCharacters, setOriginalCharacters] = useState<
    CharacterFormData[]
  >([]);
  const [storyData, setStoryData] = useState<StoryFormData | undefined>(
    undefined
  );
  const [character, setCharacter] = useState<CharacterFormData | undefined>(
    undefined
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [creatingStory, setCreatingStory] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (story) {
      setIsEditMode(true);
      setCharacters(story?.characters ?? []);
    } else {
      setIsEditMode(false);
    }
  }, [story]);

  useEffect(() => {
    fetchUserCharacters();
  }, []);

  const addCharacter = () => {
    setShowCharacterForm(true);
  };

  const handleBack = () => {
    setShowCharacterForm(false);
  };

  const handleCharacterSave = (character: CharacterFormData) => {
    if (selectedIndex !== null && selectedIndex >= 0) {
      setCharacters(
        characters.map((char, index) =>
          index === selectedIndex ? character : char
        )
      );
    } else {
      setCharacters([...characters, character]);
    }
    setShowCharacterForm(false);
    setSelectedIndex(null);
    setCharacter(undefined);
  };

  const handleCharacterRemove = (index: number) => {
    setCharacters(characters.filter((_, i) => i !== index));
  };

  const handleCharacterSelect = (index: number) => {
    setCharacter(characters[index]);
    setSelectedIndex(index);
    setShowCharacterForm(true);
  };

  const scrollToStoryCreateLoader = () => {
    setTimeout(() => {
      const storyCreateLoader = document.getElementById('storyCreateLoader');
      if (storyCreateLoader) {
        storyCreateLoader.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1000);
  }

  const handleStorySave = (data: StoryFormData, generate: boolean = false) => {
    setStoryData(data);
    if (generate) {

      const storyPostData: any = {
        ...data,
        characters,
      };
      if (story?._id) {
        storyPostData._id = story._id;
      }

      setCreatingStory(true);
      scrollToStoryCreateLoader();

      let request: any = createStory(storyPostData);

      request.then((res: any) => {
        router.push(`/my-stories/${res?.data?._id}`);
      })
        .catch((err: any) => {
          toast.error(err?.message ?? "Failed to create story");
          setCreatingStory(false);
        });
    }
  };

  const fetchUserCharacters = () => {
    fetchUserCharactersReq()
      .then((res: any) => {
        setOriginalCharacters(res.data);
      })
      .catch((err) => {
        toast.error(err?.message ?? "Failed to fetch characters");
      });
  };

  return (
    <>
      <>

        <div className={`story-create-loading ${creatingStory ? 'show' : ''}`} id="storyCreateLoader">
          <Image
            src="/assets/images/regenrate-simple.svg"
            width={24}
            height={24}
            alt="icon"
            className={`animate-spin blackimg w-[24px] h-[24px] object-cover me-2`}
          />
          <span>Creating story, please wait...</span>
        </div>

        {showCharacterForm ? (
          <CharacterForm
            character={character}
            handleSave={handleCharacterSave}
            handleBack={handleBack}
            characters={characters}
            originalCharacters={originalCharacters}
            isEdit={isEditMode}
          />
        ) : (
          <AboutStory
            creatingStory={creatingStory}
            storyData={storyData}
            onSave={handleStorySave}
            addCharacter={addCharacter}
            onRemoveCharacter={handleCharacterRemove}
            onSelectCharacter={handleCharacterSelect}
            characters={characters}
            isEdit={isEditMode}
            story={story}
          />
        )}
      </>
    </>
  );
}
