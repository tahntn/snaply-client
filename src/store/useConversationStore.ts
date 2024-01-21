import { IMessage } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IGif } from '@giphy/js-types';

interface GlobalState {
  replyMessage: IMessage | null;
  fileUpload: File[];
  giphyUrl?: IGif | null;
  isOpenGif: boolean;
}

export interface GlobalStore extends GlobalState {
  setReplyMessage: (message: IMessage) => void;
  resetReplyMessage: () => void;
  addFile: (file: File[]) => void;
  deleteFile: (file: File) => void;
  deleteAllFiles: () => void;
  setGiphyUrl: (url: IGif) => void;
  handleOpenGif: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  replyMessage: null,
  fileUpload: [],
  giphyUrl: null,
  isOpenGif: false,
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
    handleOpenGif: () => {
      set((state) => {
        {
          state.isOpenGif = !state.isOpenGif;
        }
      });
    },
  }))
);

export default useConversationStore;
