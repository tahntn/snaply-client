import { useMediaQuery } from '@/hooks/useMediaQuery';
import React from 'react';
import { Box } from '@radix-ui/themes';
import FriendRequest from './FriendRequest/FriendRequest';
import { DialogOtherUser } from '@/components/Dialog';
import { useGlobalStore } from '@/store';

interface FriendRequestPageProps {
  children: React.ReactNode;
}

const FriendRequestPage: React.FC<FriendRequestPageProps> = ({ children }) => {
  const { isOpenDialogOtherUser } = useGlobalStore((state) => state);
  const tablet = '(max-width: 1000px)';
  const isTablet = useMediaQuery(tablet);

  return (
    <div className="h-full w-full">
      {isTablet ? (
        <FriendRequest />
      ) : (
        <Box className="h-full">
          <Box className="h-full bg-gray-100 dark:bg-black_custom-500 max-w-[30%]">
            <FriendRequest />
          </Box>
          <Box>{children}</Box>
        </Box>
      )}
      {isOpenDialogOtherUser && <DialogOtherUser />}
    </div>
  );
};

export default FriendRequestPage;
