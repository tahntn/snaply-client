import { cn } from '@/lib/utils';
import React from 'react';

interface StickerMessageProps {
  url: string;
}

const StickerMessage: React.FC<StickerMessageProps> = ({ url }) => {
  return <img src={url} className={cn('')} />;
};

export default StickerMessage;
