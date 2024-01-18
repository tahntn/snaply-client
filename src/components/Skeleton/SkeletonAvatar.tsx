import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonAvatarProps {
  className?: string;
}

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ className }) => {
  return <Skeleton className={cn('h-12 w-12 rounded-full bg-foreground', className)} />;
};

export default SkeletonAvatar;
