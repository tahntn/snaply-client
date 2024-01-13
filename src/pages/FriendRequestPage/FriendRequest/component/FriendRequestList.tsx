import { useInView } from 'react-intersection-observer';
import { Box } from '@radix-ui/themes';
import { useFriends } from '@/hooks/useFriends';
import React from 'react';

const FriendRequestList: React.FC = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useFriends({
    type: 'friendRequests',
  });

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

  console.log('data', data);

  return (
    <Box className="flex gap-5 pb-5 flex-col overflow-y-auto max-h-[750px] pr-4 overflow-x-hidden">
      <div ref={ref} style={{ height: '20px' }} />
    </Box>
  );
};

export default FriendRequestList;
