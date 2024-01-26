import { useGetMe } from '@/hooks';
import { IDetailConversation } from '@/types';
import React from 'react';
import SkeletonText from '../Skeleton/SkeletonText';
import { Text } from '@radix-ui/themes';

interface NameConversationProps {
  isLoading: boolean;
  conversation: IDetailConversation;
  classNameSkeleton?: string;
  classNameText?: string;
}

const NameConversation: React.FC<NameConversationProps> = ({
  isLoading,
  conversation,
  classNameText,
  classNameSkeleton,
}) => {
  const { data: currentUser } = useGetMe();
  const targetUser = React.useMemo(() => {
    return conversation?.participants?.find(
      (user) => user._id !== currentUser?.id && user.id !== currentUser?.id
    )!;
  }, [conversation?.participants, currentUser]);
  return isLoading ? (
    <SkeletonText className={classNameSkeleton} />
  ) : !!conversation.isGroup ? (
    <p className={classNameText}>{conversation.nameGroup}</p>
  ) : (
    <p className={classNameText}>{targetUser.username}</p>
  );
};

export default NameConversation;
