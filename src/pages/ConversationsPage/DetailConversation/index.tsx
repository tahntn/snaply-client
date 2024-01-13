import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { useDetailConversation, useGetMe } from '@/hooks';
import { IUser } from '@/types';
import { Navigate, useParams } from 'react-router-dom';
import MessageList from './component/MessageList';
import ChatMessage from './component/ChatMessage';
const DetailConversation = () => {
  const { conversationId } = useParams();
  const { data: currentUser } = useGetMe();
  const { data, isLoading, isError } = useDetailConversation(conversationId!);

  if (!!isError) {
    return <Navigate replace to={'/conversation'} />;
  }

  return (
    <div className="relative md:h-screen sm:h-[calc(100vh)] xs:h-[calc(100vh-64px)]">
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
        className="flex-1 h-full   bg-custom-3 border-t pt-[80px] pb-[96px] border-b border-gray-500 

      "
      >
        <MessageList conversationId={conversationId!} currentUser={currentUser!} />
      </div>
      <div className="h-20 px-3 py-2 absolute bottom-0 right-0 left-0  border-t border-card-foreground">
        <ChatMessage />
      </div>
    </div>
  );
};

export default DetailConversation;
