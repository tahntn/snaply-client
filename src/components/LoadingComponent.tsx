import React from 'react';
import { Icons } from './ui/icons';
import { cn } from '@/lib/utils';

interface LoadingComponentProps {
  className?: string | undefined;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ className }) => {
  return <Icons.spinner className={cn('animate-spin', className)} />;
};

export default LoadingComponent;
