import { create } from 'zustand';

interface GlobalState {
  isLogin: boolean;
}

export interface GlobalStore extends GlobalState {
  setLogin: () => void;
  setLogout: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  isLogin: false,
};

const useAuthStore = create<GlobalStore>()((set) => ({
  ...initialState,
  setLogin: () => {
    set(() => {
      return { isLogin: true };
    });
  },
  setLogout: () => {
    set(() => {
      return { isLogin: false };
    });
  },
}));

export default useAuthStore;
