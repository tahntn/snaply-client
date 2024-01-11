import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React from 'react';

const ChatMessage = () => {
  return (
    <div className="px-2 py-3 flex gap-2 items-center h-full">
      <div
        className={cn(
          'flex items-center rounded-md border border-input h-full flex-1 bg-white text-sm  shadow-md ring-offset-background focus-within:ring-1 px-3 focus-within:ring-ring focus-within:ring-offset-2'
        )}
      >
        <Icons.link />
        <textarea
          className={cn(
            'w-full resize-none h-full  p-2 placeholder:text-muted-foreground focus-visible:outline-none text-xl  disabled:opacity-50'
          )}
        />

        <Icons.smile />
      </div>
      <Button className="h-full rounded-md">
        <Icons.send className="" />
      </Button>
    </div>
  );
};

export default ChatMessage;
