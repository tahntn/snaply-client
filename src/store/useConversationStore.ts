import { IMessage } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
interface GlobalState {
  replyMessage: IMessage | null;
  fileUpload: File[];
}

export interface GlobalStore extends GlobalState {
  setReplyMessage: (message: IMessage) => void;
  resetReplyMessage: () => void;
  addFile: (file: File[]) => void;
  deleteFile: (file: File) => void;
  deleteAllFiles: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  replyMessage: null,
  fileUpload: [],
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
  }))
);

export default useConversationStore;
