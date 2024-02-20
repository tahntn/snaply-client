/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@radix-ui/themes';
import { useFriends } from '@/hooks/useFriends';
import { cn } from '@/lib/utils';
import FriendElement from './FriendElement';
import { useTranslation } from 'react-i18next';
import LoadingComponent from '@/components/LoadingComponent';

interface ListSearchProps {
  keyword: string;
}

const FriendList: React.FC<ListSearchProps> = ({ keyword }) => {
  const { ref, inView } = useInView();
  const { t } = useTranslation();
  const { data, isLoading, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFriends(keyword);

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

  if (!data?.pages?.[0]?.data?.length) {
    return <p className="text-center pt-[140px]">{t('friend.form.notFound')}</p>;
  }

  return (
    <Box className="p-6 pr-0 h-screen pt-[140px]">
      <Box className="overflow-y-auto overflow-x-hidden pr-6 flex gap-2 flex-col h-full">
        {data &&
          data?.pages.map((listFriend: any) => {
            return listFriend?.data?.map((friendInfo: any) => (
              <>
                <div
                  className={cn(
                    'relative font-semibold text-base',
                    'before:absolute before:h-[1px] before:top-1/2 before:translate-y-1/2 before:left-[40px] before:right-0 before:bg-gray-400 before:w-[calc(100%-40px)]'
                  )}
                >
                  {friendInfo?._id?.toUpperCase()}
                </div>
                {friendInfo?.friends?.map((friend: any) => (
                  <FriendElement key={friend?._id} friend={friend?.user} />
                ))}
              </>
            ));
          })}
        <div ref={ref} style={{ height: '20px' }} />
      </Box>
    </Box>
  );
};

export default FriendList;
