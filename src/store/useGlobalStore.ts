import { create } from 'zustand';

interface GlobalState {
  isMenuOpen: boolean;
}

export interface GlobalStore extends GlobalState {
  toggleMenu: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  isMenuOpen: false,
};

const useGlobalStore = create<GlobalStore>()((set) => ({
  ...initialState,
  toggleMenu: () => {
    set((state) => {
      return { isMenuOpen: !state.isMenuOpen };
    });
  },
}));

export default useGlobalStore;
