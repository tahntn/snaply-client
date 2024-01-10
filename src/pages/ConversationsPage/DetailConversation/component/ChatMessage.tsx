import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const ChatMessage = () => {
  return (
    <div className="px-2 py-3">
      <Textarea placeholder="Tyoe somthing..." className="resize-none max-h-full min-h-fit" />
    </div>
  );
};

export default ChatMessage;
