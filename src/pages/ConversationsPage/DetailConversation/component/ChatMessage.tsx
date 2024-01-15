import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

const ChatMessage = () => {
  return (
    <div className="px-2 py-3 flex gap-2 items-center h-full">
      <Button className="h-full rounded-2xl bg-custom_5  text-black">
        <Icons.smile className="w-4 h-4" />
      </Button>
      <div
        className={cn(
          'flex items-center border border-input rounded-2xl h-full flex-1 text-sm bg-custom_5   px-3 '
        )}
      >
        <textarea
          className={cn(
            'w-full resize-none h-full text-black  p-2 placeholder:text-[#a4a4a4] focus-visible:outline-none text-sm  disabled:opacity-50 bg-transparent'
          )}
          placeholder="Write somthing"
        />
      </div>

      <Button className="h-full  rounded-2xl text-[white] bg-[#020817] border-foreground border text-xs  ">
        <Icons.send className="w-4 h-4" />
      </Button>
      <Button className="h-full  rounded-2xl  bg-custom_5  text-black">
        <Icons.moreHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatMessage;
