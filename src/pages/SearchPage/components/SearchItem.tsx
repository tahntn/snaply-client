import AvatarUser from '@/components/AvatarUser';
import { IUser } from '@/types';
import React, { FC } from 'react';
interface SearchItemProps {
  user: IUser;
}
const SearchItem: FC<SearchItemProps> = ({ user }) => {
  return (
    <div className="flex gap-3 items-center border px-3 py-2 rounded-lg">
      <AvatarUser name={user.username} url={user.avatar} classNameAvatar="w-12 h-12" />
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold">{user.username}</h3>
        <h4 className="text-base">{user.email}</h4>
      </div>
    </div>
  );
};

export default SearchItem;
