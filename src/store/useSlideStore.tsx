import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Slide } from "@/lib/types";
import { Project } from "@prisma/client";

interface SlideState {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  setProject: (project: Project) => void;
  project: Project | null;
}

export const useSlideStore = create(
  persist<SlideState>(
    (set) => ({
      slides: [],
      project: null,
      setSlides: (slides: Slide[]) => set({ slides }),
      setProject: (project) => set({ project }),
    }),
    {
      name: "slides-storage",
    }
  )
);
