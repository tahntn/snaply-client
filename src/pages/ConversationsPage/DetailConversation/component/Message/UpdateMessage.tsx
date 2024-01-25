import AvatarUser from '@/components/AvatarUser';
import { Separator } from '@/components/ui/separator';
import { useDetailConversation, useGetMe } from '@/hooks';
import { cn } from '@/lib/utils';
import { IUser } from '@/types';
import { Text } from '@radix-ui/themes';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';

interface UpdateMessageProps {
  user: IUser;
  title: string;
  createdAt: Date;
}

const UpdateMessage: React.FC<UpdateMessageProps> = ({ user, title, createdAt }) => {
  const { data: currentUser } = useGetMe();
  const { conversationId } = useParams();
  const { data, isLoading } = useDetailConversation(conversationId!);
  const targetUser = React.useMemo(() => {
    return data?.participants.find(
      (user) => user._id !== currentUser?.id && user.id !== currentUser?.id
    )!;
  }, [data?.participants, currentUser]);
  if (isLoading) return null;
  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-10">
        <AvatarUser
          name={targetUser?.username}
          url={targetUser?.avatar}
          classNameAvatar="h-36 w-36 mb-5"
        />
        <h5 className="text-4xl font-medium">{targetUser?.username}</h5>
      </div>
      <div className="flex w-full justify-center items-center gap-3 px-10 my-4">
        <Separator className="flex-1" />
        <Text>{moment(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
        <Separator className="flex-1" />
      </div>
      <h4 className={cn('text-center text-xl')}>
        <span className="font-semibold">
          {user?._id === currentUser?.id || user?.id === currentUser?.id ? 'Bạn' : user?.username}{' '}
        </span>
        {title === 'new'
          ? 'đã tạo cuộc trò chuyện'
          : title === 'change_name_group'
          ? 'đã thay đổi tên nhóm'
          : 'đã thay đổi ảnh nhóm'}
      </h4>
    </div>
  );
};

export default UpdateMessage;
