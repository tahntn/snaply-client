import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from '@/context/ThemeProvider';
import { cn } from '@/lib/utils';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ButtonEmojiProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const ButtonEmoji: React.FC<ButtonEmojiProps> = ({ setValue }) => {
  const { i18n } = useTranslation();
  const { mainTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger>
        <Button className={cn('rounded-2xl bg-custom_5 h-[40px] w-[40px]  text-black p-3 ')}>
          <Icons.smile className="w-full h-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-0 p-0 border-0">
        <div className="translate-y-[-5%] -translate-x-8">
          <Picker
            data={data}
            emojiSize={20}
            locale={i18n.language}
            theme={mainTheme}
            previewPosition="none"
            onEmojiSelect={(emoji: { native: string }) => setValue((prev) => prev + emoji.native)}
            maxFrequentRows={1}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ButtonEmoji;
