import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDetailConversation, useGetMe } from '@/hooks';
import { IUser } from '@/types';
import { useParams } from 'react-router-dom';
const DetailConversation = () => {
  const { conversationId } = useParams();
  const { data: currentUser } = useGetMe();
  const { data } = useDetailConversation(conversationId!) as any;
  return (
    <div className="flex flex-col h-full">
      <div className="h-20 shadow-lg flex items-center  justify-between px-3">
        <div className="flex items-center gap-1">
          {!!data?.data.isGroup ? (
            <>
              <Avatar className="me-3 border border-gray-500">
                <AvatarImage src={data?.data?.avatarGroup} />
                <AvatarFallback className="uppercase">{data?.data?.nameGroup?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-normal">{data?.data?.nameGroup}</h3>
              </div>
            </>
          ) : (
            <>
              <Avatar className="me-3 border border-gray-500">
                <AvatarImage
                  src={
                    data?.data?.participants.find(
                      (userItem: IUser) => userItem.id !== currentUser?.id
                    ).avatar
                  }
                />
                <AvatarFallback className="uppercase">
                  {
                    data?.data?.participants.find(
                      (userItem: IUser) => userItem.id !== currentUser?.id
                    ).username
                  }
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 bg-slate-200"></div>
    </div>
  );
};

export default DetailConversation;
