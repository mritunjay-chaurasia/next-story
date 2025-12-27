import { getStory, updateStory } from "@/services/story-service";
import { createContext, useContext, ReactNode, useState } from "react";

// Define the type for what context will provide
interface StoryContextType {
    story: Story;
    saveUpdatedStory: (updatedStory: Story, save?: boolean) => void
    loadStory: () => void
    openBuyHardCopyModal: boolean,
    setOpenBuyHardCopyModal: (newState: boolean) => void,
    openUpdateCoverModal: boolean,
    setOpenUpdateCoverModal: (newState: boolean) => void,
    openDownloadModal: boolean,
    setOpenDownloadModal: (newState: boolean) => void
    storyLoading: boolean
    storySaving: boolean
}

// Create the context
const StoryContext = createContext<StoryContextType | undefined>(undefined);

// Hook to use context
export const useStory = (): StoryContextType => {
    const context = useContext(StoryContext);
    if (!context) {
        throw new Error("useStory must be used within a StoryProvider");
    }
    return context;
};

// Provider component props
interface StoryProviderProps {
    initialStory: Story;
    children: ReactNode;
}

// Provider component
export const StoryProvider = ({ initialStory, children }: StoryProviderProps) => {

    const [story, setStory] = useState<Story>(initialStory);

    const [openBuyHardCopyModal, setOpenBuyHardCopyModal] = useState(false);
    const [openUpdateCoverModal, setOpenUpdateCoverModal] = useState(false);
    const [openDownloadModal, setOpenDownloadModal] = useState(false);

    const [storyLoading, setStoryLoading] = useState(false);
    const [storySaving, setStorySaving] = useState(false);

    const loadStory = () => {
        if (story._id) {
            setStoryLoading(true);
            getStory(story._id)
                .then((res: any) => {
                    setStory(res?.data);
                    setStoryLoading(false);
                    setStorySaving(false);
                })
                .catch((err) => {
                    setStoryLoading(false);
                    setStorySaving(false);
                });
        } else {
            setStorySaving(false);
        }
    };

    const saveUpdatedStory = (updatedStory: Story, save: boolean = true) => {
        setStory(updatedStory);
        if (save) {
            setStorySaving(true);
            updateStory(updatedStory._id, {
                ...updatedStory
            }).then(() => {
                setStorySaving(false);
                // loadStory();
            }).catch((err: any) => {
                setStorySaving(false);
            })
        } else {
            //update just state
            setStory({ ...updatedStory });
        }
    };

    return (
        <StoryContext.Provider value={{
            story,
            loadStory,
            saveUpdatedStory,
            openBuyHardCopyModal,
            setOpenBuyHardCopyModal,
            openUpdateCoverModal,
            setOpenUpdateCoverModal,
            openDownloadModal,
            setOpenDownloadModal,
            storyLoading,
            storySaving
        }}>
            {children}
        </StoryContext.Provider>
    );
};
