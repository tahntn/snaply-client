import { create } from 'zustand';

interface GlobalState {
  isMenuOpen: boolean;
  previewImage: {
    isOpen: boolean;
    urlImage: string;
  };
}

export interface GlobalStore extends GlobalState {
  toggleMenu: () => void;
  handleOpenDialogImage: (urlImage: string) => void;
  handleCloseDialogImage: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  isMenuOpen: false,
  previewImage: {
    isOpen: false,
    urlImage: '',
  },
};

const useGlobalStore = create<GlobalStore>()((set) => ({
  ...initialState,
  toggleMenu: () => {
    set((state) => {
      return { isMenuOpen: !state.isMenuOpen };
    });
  },
  handleCloseDialogImage: () =>
    set((state) => ({
      ...state,
      previewImage: {
        isOpen: false,
        urlImage: '',
      },
    })),
  handleOpenDialogImage: (urlImage: string) =>
    set((state) => ({
      previewImage: {
        isOpen: true,
        urlImage,
      },
    })),
}));

export default useGlobalStore;
