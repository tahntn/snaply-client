import { IDetailConversation, IUser } from '@/types';
import React from 'react';
import ButtonDetailConversation from './Button/ButtonDetailConversation';
import AvatarConversation from '@/components/Conversation/AvatarConversation';
import NameConversation from '@/components/Conversation/NameConversation';

interface HeaderDetailConversationProps {
  data: IDetailConversation | undefined;
  isLoading: boolean;
  currentUser: IUser;
}

const HeaderDetailConversation: React.FC<HeaderDetailConversationProps> = ({ data, isLoading }) => {
  return (
    <div className="h-20 absolute top-0 right-0 left-0 flex items-center  justify-between px-4 border-b border-card-foreground">
      <div className="flex items-center gap-2 flex-1 max-w-[60%] ">
        <AvatarConversation
          isLoading={isLoading}
          conversation={data!}
          classNameAvatar="h-10 w-10 "
          classNameSkeleton="h-10 w-10"
        />
        <NameConversation
          isLoading={isLoading}
          conversation={data!}
          classNameText="text-xl font-normal line-clamp-1"
          classNameSkeleton="h-5  bg-foreground flex-1"
        />
      </div>
      <ButtonDetailConversation />
    </div>
  );
};

export default HeaderDetailConversation;
