import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { useDetailConversation, useGetMe, useUploadFile } from '@/hooks';
import { IUser } from '@/types';
import MessageList from './component/MessageList';
import ChatMessage from './component/ChatMessage';
import { useConversationStore } from '@/store';
import { cn } from '@/lib/utils';

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
      setHeightChatMessage(() => ChatMessageRef.current?.clientHeight!);
    });
    resizeObserver.observe(ChatMessageRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  if (!!isError) {
    return <Navigate replace to={'/conversation'} />;
  }

  React.useEffect(() => {
    resetReplyMessage();
    deleteAllFiles();
  }, [conversationId]);
  return (
    <div className=" md:h-screen sm:h-[calc(100vh)] xs:h-[calc(100vh-64px)]" {...getRootProps()}>
      <div className="h-full w-full relative" onClick={handleClick}>
        <div className="h-20 absolute top-0 right-0 left-0 flex items-center  justify-between px-4 border-b border-card-foreground">
          <div className="flex items-center gap-2 flex-1 max-w-[60%] ">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-12 rounded-full bg-foreground" />
                <Skeleton className="h-5  bg-foreground flex-1" />
              </>
            ) : !!data?.isGroup ? (
              <>
                <Avatar className=" border border-gray-500">
                  <AvatarImage src={data?.avatarGroup} />
                  <AvatarFallback className="uppercase">{data?.nameGroup?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-normal line-clamp-1">{data?.nameGroup}</h3>
                </div>
              </>
            ) : (
              <>
                <Avatar className=" border border-gray-500">
                  <AvatarImage
                    src={
                      data?.participants.find((userItem: IUser) => userItem.id !== currentUser?.id)!
                        .avatar
                    }
                  />
                  <AvatarFallback className="uppercase">
                    {
                      data?.participants.find((userItem: IUser) => userItem.id !== currentUser?.id)!
                        .username
                    }
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-normal">
                  {
                    data?.participants.find((userItem: IUser) => userItem.id !== currentUser?.id)!
                      .username
                  }
                </h3>
              </>
            )}
          </div>
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <Icons.info className="w-full h-full" />
          </Button>
        </div>
        <div
          className={cn(
            'flex-1 h-full   bg-custom-3 border-t pt-[80px] border-b border-gray-500 ',
            `pb-[${heightChatMessage.toString()}px]` // cái này để check sau, dùng tạm style thường
          )}
          style={{
            paddingBottom: `${heightChatMessage}px`,
          }}
        >
          <MessageList conversationId={conversationId!} currentUser={currentUser!} />
        </div>
        {/* {replyMessage?.id && (
          <div className="h-16 absolute bottom-20 border-t  right-0 left-0  border-card-foreground">
            <ReplyMessage />
          </div>
        )} */}
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
