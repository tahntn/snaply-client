import { useInView } from 'react-intersection-observer';
import { Box } from '@radix-ui/themes';
import React from 'react';
import { useFriendRequest } from '@/hooks';
import FriendRequestElement from './FriendRequestElement';
import LoadingComponent from '@/components/LoadingComponent';
import { Navigate } from 'react-router-dom';
import emptyLight from '@/assets/images/icons/empty.png';
import emptyDark from '@/assets/images/icons/empty-dark.png';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeProvider';
const FriendRequestList: React.FC = () => {
  const { mainTheme } = useTheme();
  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFriendRequest({
      type: 'friendRequests',
    });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingComponent className="h-10 w-10" />
      </div>
    );
  }
  if (isError) {
    return <Navigate replace to={'/conversation'} />;
  }

  return (
    <Box className="p-6 pr-0 h-screen pt-[90px] ">
      <Box className="overflow-y-auto overflow-x-hidden pr-6 flex gap-4 pb-2 flex-col h-full">
        {data &&
          data.pages?.map((listFriendRequest) =>
            listFriendRequest?.data?.map((friendRequest) => (
              <FriendRequestElement key={friendRequest?._id} friendRequest={friendRequest} />
            ))
          )}
        {!data?.pages?.[0]?.data?.length && (
          <div className="flex gap-2 flex-col items-center justify-center  pt-6">
            <img src={mainTheme === 'dark' ? emptyDark : emptyLight} className="max-h-[100px]" />
            <h2 className="text-lg font-medium text-center">
              {t('friendRequest.noFriendRequests')}
            </h2>
          </div>
        )}
        {isFetchingNextPage && (
          <div className="h-full w-full flex items-center justify-center mb-10">
            <LoadingComponent className="h-10 w-10" />
          </div>
        )}
        <div ref={ref} />
      </Box>
    </Box>
  );
};

export default FriendRequestList;
