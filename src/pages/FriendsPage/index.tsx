import { useMediaQuery } from '@/hooks/useMediaQuery';
import React from 'react';

import Friend from './Friend/Friend';
import { Box } from '@radix-ui/themes';
import { useGlobalStore } from '@/store';
import { DialogOtherUser } from '@/components/Dialog';

interface FriendsPageProps {
  children: React.ReactNode;
}
const FriendsPage: React.FC<FriendsPageProps> = ({ children }) => {
  const { isOpenDialogOtherUser } = useGlobalStore((state) => state);
  const tablet = '(max-width: 1000px)';
  const isTablet = useMediaQuery(tablet);

  return (
    <div className="h-full w-full">
      {isTablet ? (
        <Friend />
      ) : (
        <Box className="h-full">
          <Box className="h-full bg-gray-100 dark:bg-black_custom-500 max-w-[30%]">
            <Friend />
          </Box>
          <Box>{children}</Box>
        </Box>
      )}
      {isOpenDialogOtherUser && <DialogOtherUser />}
    </div>
  );
};

export default FriendsPage;
