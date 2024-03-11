import { create } from 'zustand';

interface GlobalState {
  openDialogTheme: boolean;
  openDialogLanguage: boolean;
  openChangePassword: boolean;
}

export interface GlobalStore extends GlobalState {
  handleOpenDialogTheme: () => void;
  handleOpenDialogLanguage: () => void;
  handleOpenDialogPassword: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  openDialogTheme: false,
  openDialogLanguage: false,
  openChangePassword: false,
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
  handleOpenDialogPassword: () =>
    set((state) => {
      return {
        openChangePassword: !state.openChangePassword,
      };
    }),
}));

export default useSettingStore;
