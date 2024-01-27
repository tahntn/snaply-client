import { create } from 'zustand';

interface GlobalState {
  isMenuOpen: boolean;
  //preview img
  previewImage: {
    isOpen: boolean;
    urlImage: string;
  };
  //other user
  isOpenDialogOtherUser: boolean;
  idOtherUser: string | null;
}

export interface GlobalStore extends GlobalState {
  toggleMenu: () => void;
  handleOpenDialogImage: (urlImage: string) => void;
  handleCloseDialogImage: () => void;

  handleOpenDialogOtherUser: (id: string) => void;
  handleCloseDialogOtherUser: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  isMenuOpen: false,
  previewImage: {
    isOpen: false,
    urlImage: '',
  },
  isOpenDialogOtherUser: false,
  idOtherUser: null,
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
    set(() => ({
      previewImage: {
        isOpen: true,
        urlImage,
      },
    })),
  handleOpenDialogOtherUser: (id: string) =>
    set(() => ({
      isOpenDialogOtherUser: true,
      idOtherUser: id,
    })),
  handleCloseDialogOtherUser: () =>
    set(() => ({
      isOpenDialogOtherUser: false,
      idOtherUser: null,
    })),
}));

export default useGlobalStore;
