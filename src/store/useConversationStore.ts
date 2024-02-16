import { IMessage } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IGif } from '@giphy/js-types';

type IValueGif = 'gif' | 'sticker';

interface GlobalState {
  replyMessage: IMessage | null;
  fileUpload: File[];
  giphyUrl?: IGif | null;
  isOpenGif: boolean;
  valueGif: IValueGif;
  shouldFocusInput: boolean;
}

export interface GlobalStore extends GlobalState {
  setReplyMessage: (message: IMessage) => void;
  resetReplyMessage: () => void;
  addFile: (file: File[]) => void;
  deleteFile: (file: File) => void;
  deleteAllFiles: () => void;
  setGiphyUrl: (url: IGif) => void;
  handleOpenGif: (value: IValueGif) => void;
  focusInput: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  shouldFocusInput: false,
  replyMessage: null,
  fileUpload: [],
  giphyUrl: null,
  isOpenGif: false,
  valueGif: 'gif',
};

const useConversationStore = create<GlobalStore>()(
  immer((set) => ({
    ...initialState,
    setReplyMessage: (message: IMessage) => {
      set((state) => {
        {
          state.replyMessage = message;
        }
      });
    },
    resetReplyMessage: () => {
      set(() => ({ replyMessage: null }));
    },
    addFile: (files: File[]) => {
      set((state) => {
        state.fileUpload = [...state.fileUpload, ...files];
      });
    },
    deleteFile: (file: File) => {
      set((state) => {
        state.fileUpload = state.fileUpload.filter((f) => f !== file);
      });
    },
    deleteAllFiles: () => {
      set(() => ({ fileUpload: [] }));
    },
    setGiphyUrl: (url: IGif) => {
      set((state) => {
        {
          state.giphyUrl = url;
        }
      });
    },
    handleOpenGif: (value: IValueGif) => {
      set((state) => {
        {
          state.isOpenGif = !state.isOpenGif;
          state.valueGif = value;
        }
      });
    },
    focusInput: () =>
      set((state) => {
        {
          state.shouldFocusInput = !state.shouldFocusInput;
        }
      }),
  }))
);

export default useConversationStore;
