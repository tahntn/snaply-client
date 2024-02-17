import { IDetailConversation, IUser } from '@/types';
import React from 'react';
import ButtonDetailConversation from './Button/ButtonDetailConversation';
import AvatarConversation from '@/components/Conversation/AvatarConversation';
import NameConversation from '@/components/Conversation/NameConversation';
import { useMediaQuery } from '@/hooks';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderDetailConversationProps {
  data: IDetailConversation | undefined;
  isLoading: boolean;
  currentUser: IUser;
}

const HeaderDetailConversation: React.FC<HeaderDetailConversationProps> = ({ data, isLoading }) => {
  const tablet = '(max-width: 1000px)';
  const isTablet = useMediaQuery(tablet);
  const navigate = useNavigate();
  return (
    <div className="h-20 absolute top-0 right-0 left-0 flex items-center  justify-between px-4 border-b border-card-foreground">
      <div className="flex items-center gap-2 flex-1 max-w-[60%] ">
        {isTablet && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 p-1 border-transparent"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icons.chevronLeft className="cursor-pointer " />
          </Button>
        )}
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
