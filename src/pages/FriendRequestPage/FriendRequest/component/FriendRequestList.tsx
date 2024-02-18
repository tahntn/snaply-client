/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInView } from 'react-intersection-observer';
import { Box } from '@radix-ui/themes';
import React from 'react';
import { useFriendRequest } from '@/hooks';
import FriendRequestElement from './FriendRequestElement';
import LoadingComponent from '@/components/LoadingComponent';

const FriendRequestList: React.FC = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFriendRequest({
      type: 'friendRequests',
    });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingComponent className="h-10 w-10" />
      </div>
    );
  }

  if (status === 'error') {
    return <p>Error</p>;
  }

  return (
    <Box className="p-6 pr-0 h-screen pt-[90px] ">
      <Box className="overflow-y-auto overflow-x-hidden pr-6 flex gap-3 flex-col h-full">
        {data &&
          data.pages?.map((listFriendRequest) =>
            listFriendRequest?.data?.map((friendRequest) => (
              <FriendRequestElement key={friendRequest?._id} friendRequest={friendRequest} />
            ))
          )}
      </Box>
      <div ref={ref} style={{ height: '20px' }} />
    </Box>
  );
};

export default FriendRequestList;
