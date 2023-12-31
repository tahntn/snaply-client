import { create } from 'zustand';

interface GlobalState {
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface GlobalStore extends GlobalState {
  setLogin: () => void;
  setLogout: () => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  isLogin: false,
  accessToken: '',
  refreshToken: '',
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
  setAccessToken: (accessToken) => {
    set(() => {
      return { accessToken };
    });
  },
  setRefreshToken: (refreshToken) => {
    set(() => {
      return { refreshToken };
    });
  },
}));

export default useAuthStore;
