import { IUser } from '@/types';
import React from 'react';

import Typing from '@/components/Typing';
import AvatarUser from '@/components/AvatarUser';

interface UserTypingProps {
  listUserTyping: IUser[];
}

const UserTyping: React.FC<UserTypingProps> = ({ listUserTyping }) => {
  return (
    <div className="flex items-center gap-4 px-2 py-2">
      <div className="flex space-x-reverse -space-x-3 flex-row-reverse justify-end">
        {listUserTyping.map((user) => (
          <AvatarUser name={user?.username} url={user?.avatar} classNameAvatar=" h-10 w-10 " />
        ))}
      </div>

      <Typing />
    </div>
  );
};

export default UserTyping;
