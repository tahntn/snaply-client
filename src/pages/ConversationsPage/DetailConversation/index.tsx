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
    <div className="flex flex-col md:h-screen sm:h-[calc(100vh-64px)]">
      <div className="h-20 shadow-lg flex items-center  justify-between px-4">
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
      <div className="flex-1 bg-slate-200">
        <MessageList conversationId={conversationId!} currentUser={currentUser!} />
      </div>
      <div className="h-20 bg-slate-400">
        <ChatMessage />
      </div>
    </div>
  );
};

export default DetailConversation;
