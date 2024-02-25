import { create } from 'zustand';

interface GlobalState {
  openDialogTheme: boolean;
  openDialogLanguage: boolean;
}

export interface GlobalStore extends GlobalState {
  handleOpenDialogTheme: () => void;
  handleOpenDialogLanguage: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  openDialogTheme: false,
  openDialogLanguage: false,
};

const useSettingStore = create<GlobalStore>()((set) => ({
  ...initialState,
  handleOpenDialogTheme: () =>
    set((state) => ({
      openDialogTheme: !state.openDialogTheme,
    })),
  handleOpenDialogLanguage: () =>
    set((state) => {
      return {
        openDialogLanguage: !state.openDialogLanguage,
      };
    }),
}));

export default useSettingStore;
