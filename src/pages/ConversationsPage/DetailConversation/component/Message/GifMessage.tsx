import { cn } from '@/lib/utils';
import React from 'react';

interface GifMessageProps {
  url: string;
  className?: string;
}

const GifMessage: React.FC<GifMessageProps> = ({ url, className }) => {
  return <img src={url} className={cn('max-h-[300px]', className)} />;
};

export default GifMessage;
