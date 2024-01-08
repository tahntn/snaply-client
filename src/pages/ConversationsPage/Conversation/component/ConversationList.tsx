import React from 'react';
import { Box, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

import ChatElement from './ChatElement';
import { useConversations } from '@/hooks';

const ConversationList = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  const { data, isLoading, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useConversations();

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
      <Text className="text-lg font-semibold">{t('conversation.allConversation')}</Text>
      {data &&
        data.pages?.map((listConversation: any) =>
          listConversation?.data?.map((conversation: any) => (
            <ChatElement conversation={conversation} />
          ))
        )}
      <div ref={ref} style={{ height: '20px' }} />
    </Box>
  );
};

export default ConversationList;
