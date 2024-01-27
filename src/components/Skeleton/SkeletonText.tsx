import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonTextProps {
  className?: string;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({ className }) => {
  return <Skeleton className={cn('h-4 w-full bg-foreground ', className)} />;
};

export default SkeletonText;
