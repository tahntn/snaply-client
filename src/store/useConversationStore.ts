import { IMessage } from '@/types';
import { create } from 'zustand';

interface GlobalState {
  replyMessage: IMessage | null;
}

export interface GlobalStore extends GlobalState {
  setReplyMessage: (message: IMessage) => void;
  resetReplyMessage: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  replyMessage: null,
};

const useConversationStore = create<GlobalStore>()((set) => ({
  ...initialState,
  setReplyMessage: (message: IMessage) => {
    set(() => {
      return { replyMessage: message };
    });
  },
  resetReplyMessage: () => {
    set(() => {
      return initialState;
    });
  },
}));

export default useConversationStore;
