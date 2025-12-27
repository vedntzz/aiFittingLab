import { create } from 'zustand';
import { Garment, StyleParams } from '@/types';

interface LabStore {
  userImage: string | null;
  garments: Garment[];
  styleParams: StyleParams;
  generatedImage: string | null;
  isGenerating: boolean;
  setUserImage: (image: string | null) => void;
  addGarment: (garment: Garment) => void;
  removeGarment: (id: string) => void;
  updateStyleParams: (params: Partial<StyleParams>) => void;
  setGeneratedImage: (image: string | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  reset: () => void;
}

const initialState = {
  userImage: null,
  garments: [],
  styleParams: {},
  generatedImage: null,
  isGenerating: false,
};

export const useLabStore = create<LabStore>((set) => ({
  ...initialState,
  setUserImage: (image) => set({ userImage: image }),
  addGarment: (garment) =>
    set((state) => ({ garments: [...state.garments, garment] })),
  removeGarment: (id) =>
    set((state) => ({
      garments: state.garments.filter((g) => g.id !== id),
    })),
  updateStyleParams: (params) =>
    set((state) => ({
      styleParams: { ...state.styleParams, ...params },
    })),
  setGeneratedImage: (image) => set({ generatedImage: image }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  reset: () => set(initialState),
}));
