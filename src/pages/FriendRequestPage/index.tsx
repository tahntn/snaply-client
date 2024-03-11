import React from 'react';
import FriendRequest from './FriendRequest/FriendRequest';
import { useGetTotalFriend } from '@/hooks/useGetTotalFriend';

const FriendRequestPage: React.FC = () => {
  const { refetch } = useGetTotalFriend('friendRequests');
  React.useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="h-full w-full">
      <FriendRequest />
    </div>
  );
};

export default FriendRequestPage;
