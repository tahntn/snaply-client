import { cn } from '@/lib/utils';
import React from 'react';

interface GifMessageProps {
  url: string;
}

const GifMessage: React.FC<GifMessageProps> = ({ url }) => {
  return <img src={url} className={cn('max-h-[300px]')} />;
};

export default GifMessage;
