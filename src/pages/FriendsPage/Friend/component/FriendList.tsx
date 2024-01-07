/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@radix-ui/themes';
import { useFriends } from '@/hooks/useFriends';
import FriendElement from './FriendElement';

const FriendList: React.FC = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useFriends();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (status === 'loading' || isLoading) {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error</p>;
  }

  return (
    <Box className="flex gap-5 pb-5 flex-col overflow-y-auto max-h-[750px] pr-4 overflow-x-hidden">
      {data &&
        data?.pages?.map((listFriend: any) => {
          return listFriend?.data?.map((friend: any) => (
            <FriendElement key={friend._id} friend={friend} />
          ));
        })}
      <div ref={ref} style={{ height: '20px' }} />
    </Box>
  );
};

export default FriendList;
