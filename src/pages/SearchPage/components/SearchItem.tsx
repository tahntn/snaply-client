import AvatarUser from '@/components/AvatarUser';
import { IUser } from '@/types';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/store';

interface SearchItemProps {
  user: IUser;
}
const SearchItem: FC<SearchItemProps> = ({ user }) => {
  const { handleOpenDialogOtherUser } = useGlobalStore((state) => state);
  return (
    <Button
      variant="outline"
      className="h-fit"
      onClick={() => {
        handleOpenDialogOtherUser((user.id || user._id)!);
      }}
    >
      <div className="flex gap-3 items-center   rounded-lg w-full">
        <AvatarUser name={user?.username} url={user?.avatar} classNameAvatar="w-12 h-12" />

        <div className="flex flex-col items-start">
          <h3 className="text-xl font-semibold">{user.username}</h3>
          <h4 className="text-base font-medium">{user.email}</h4>
        </div>
      </div>
    </Button>
  );
};

export default SearchItem;
