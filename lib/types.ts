type Story = {
  _id: string;
  user: string;
  title: string;
  description: string;
  message: string;
  rhyming: boolean;
  characters: any[];
  lastUpdatedAt: string; // ISO date string
  status: "awaitingPayment" | "completed" | "creating" | "draft";
  rawStory: string;
  response: string;
  updatedAt: string; // ISO date string
  scenes: Scene[];

  marketingConsent: boolean;

  softCopyPurchase: string;
  hardCopyPurchase: string;

  totalAmountPaid: number;

  editsAllowed: number;
  totalEdits: number;
};

type Scene = {
  _id?: string;
  title?: string;
  character?: string;
  story: string;
  scene: string;
  imagePrompt: string;
  image?: string;
  type?: string;
  scene_html?: string;
  scene_order: number;
  scene_images: string[];
};

type BookActionsHandle = {
  updateBookCover: () => void;
  downloadBook: () => void;
};

type PageFlip = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    getCurrentPageIndex: () => number;
    getPageCount: () => number;
  };
};
