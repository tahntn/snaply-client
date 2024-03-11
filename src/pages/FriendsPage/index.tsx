import React from 'react';
import Friend from './Friend/Friend';
import { useGetTotalFriend } from '@/hooks/useGetTotalFriend';

const FriendsPage: React.FC = () => {
  const { refetch } = useGetTotalFriend();
  React.useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="h-full w-full">
      <Friend />
    </div>
  );
};

export default FriendsPage;
