import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useDetailConversation, useGetMe, useUploadFile } from '@/hooks';
import MessageList from './component/MessageList';
import ChatMessage from './component/InputMessage/ChatMessage';
import { useConversationStore } from '@/store';
import { cn } from '@/lib/utils';
import HeaderDetailConversation from './component/HeaderDetailConversation';
import LoadingComponent from '@/components/LoadingComponent';

const DetailConversation = () => {
  const { conversationId } = useParams();

  const { data: currentUser } = useGetMe();
  const ChatMessageRef = React.useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useDetailConversation(conversationId!);
  const [heightChatMessage, setHeightChatMessage] = React.useState(0);
  const { resetReplyMessage, deleteAllFiles } = useConversationStore((state) => state);
  const { getRootProps } = useUploadFile();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  React.useEffect(() => {
    if (!ChatMessageRef?.current) return;
    const resizeObserver = new ResizeObserver(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      setHeightChatMessage(() => ChatMessageRef.current?.clientHeight!);
    });
    resizeObserver.observe(ChatMessageRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    resetReplyMessage();
    deleteAllFiles();
  }, [conversationId, resetReplyMessage, deleteAllFiles]);
  if (isError) {
    return <Navigate replace to={'/conversation'} />;
  }

  return (
    <div className=" md:h-screen sm:h-[calc(100vh)] xs:h-[calc(100vh-64px)]" {...getRootProps()}>
      <div className="h-full w-full relative" onClick={handleClick}>
        <HeaderDetailConversation data={data} isLoading={isLoading} currentUser={currentUser!} />
        <div
          className={cn(
            'flex-1 h-full   bg-custom-3 border-t pt-[80px] border-b border-gray-500 ',
            `pb-[${heightChatMessage.toString()}px]` // cái này để check sau, dùng tạm style thường
          )}
          style={{
            paddingBottom: `${heightChatMessage}px`,
          }}
        >
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <LoadingComponent />
            </div>
          ) : (
            <MessageList
              conversationId={conversationId!}
              currentUser={currentUser!}
              participants={data?.participants}
            />
          )}
        </div>
        <div
          ref={ChatMessageRef}
          className={cn(
            'h-fit min-h-[80px] px-3 py-2 absolute bottom-0 right-0 left-0  border-t border-card-foreground'
          )}
        >
          <ChatMessage />
        </div>
      </div>
    </div>
  );
};

export default DetailConversation;
