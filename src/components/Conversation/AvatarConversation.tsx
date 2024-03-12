import React from 'react';
import SkeletonAvatar from '../Skeleton/SkeletonAvatar';
import AvatarUser from '../AvatarUser';
import { IDetailConversation } from '@/types';
import { useGetMe } from '@/hooks';

interface AvatarConversationProps {
  isLoading: boolean;
  conversation?: IDetailConversation;
  classNameSkeleton?: string;
  classNameAvatar?: string;
  children?: React.ReactNode;
  classNameWrap?: string;
}
const AvatarConversation: React.FC<AvatarConversationProps> = ({
  isLoading,
  conversation,
  classNameAvatar,
  classNameSkeleton,
  children,
  classNameWrap,
}) => {
  const { data: currentUser } = useGetMe();
  const targetUser = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    return conversation?.participants?.find(
      (user) => user._id !== currentUser?.id && user.id !== currentUser?.id
    )!;
  }, [conversation?.participants, currentUser]);
  return (
    <div className={classNameWrap}>
      {isLoading ? (
        <SkeletonAvatar className={classNameSkeleton} />
      ) : conversation?.isGroup ? (
        <AvatarUser
          name={conversation?.nameGroup}
          url={conversation?.avatarGroup}
          classNameAvatar={classNameAvatar}
        />
      ) : (
        <AvatarUser
          name={targetUser?.username}
          url={targetUser?.avatar}
          classNameAvatar={classNameAvatar}
        />
      )}
      {children}
    </div>
  );
};

export default AvatarConversation;
