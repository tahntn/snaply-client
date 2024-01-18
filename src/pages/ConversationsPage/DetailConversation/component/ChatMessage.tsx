import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUploadFile } from '@/hooks';
import { cn } from '@/lib/utils';
import { useConversationStore } from '@/store';
import { Text } from '@radix-ui/themes';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeProvider';
import GiphySelect from './GiphySelect';
// import { Gif } from '@giphy/react-components';

interface ChatMessageProps {}

const ChatMessage: React.FC<ChatMessageProps> = ({}) => {
  const { fileUpload, deleteFile, giphyUrl } = useConversationStore((state) => state);

  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [isOpenPopover, setIsOpenPopover] = React.useState(false);
  const [value, setValue] = React.useState('');

  const { getRootProps, getInputProps } = useUploadFile();

  return (
    <div
      className={cn('px-2 py-3 flex gap-2 items-end h-full', fileUpload.length > 0 && 'items-end')}
    >
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
              locale={currentLanguage}
              theme={theme}
              previewPosition="none"
              onEmojiSelect={(emoji: { native: string }) => setValue(value + emoji.native)}
              maxFrequentRows={1}
            />
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <Button className={cn(' rounded-2xl bg-custom_5 h-[40px] w-[40px]  text-black p-3 ')}>
            Gif
          </Button>
        </PopoverTrigger>
        <PopoverContent className="translate-y-[-5%] translate-x-14 bg-black-800">
          <GiphySelect />
        </PopoverContent>
      </Popover>

      <div
        className={cn(
          'flex  border border-input rounded-2xl  flex-1 text-sm bg-custom_5  px-3 ',
          fileUpload.length > 0 ? 'flex-col p-3 gap-1' : 'items-center '
        )}
      >
        {fileUpload.length > 0 && (
          <div className="flex gap-2 items-center h-15 max-w-full ">
            <div
              {...getRootProps({ className: 'dropzone' })}
              className="h-10 w-10   rounded-sm shadow-md overflow-hidden flex items-center justify-center bg-slate-400"
            >
              <input {...getInputProps()} />
              <Icons.imagePlus />
            </div>
            {fileUpload.map((file, index) => (
              <div className="h-10 w-10  rounded-sm shadow-md relative border transition-opacity duration-300 ease-in-out hover:opacity-75">
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index}`}
                  className="h-full w-full object-cover  rounded-sm v"
                />
                <div className="absolute h-4 w-4 bg-muted-foreground top-[-3px] right-[-3px] rounded-full shadow-xl flex items-center justify-center cursor-pointer">
                  <Icons.close
                    className="h-3/4"
                    onClick={() => {
                      deleteFile(file);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* {giphyUrl && <Gif gif={giphyUrl} width={200} noLink={true} hideAttribution={true} />} */}

        <div></div>
        <TextareaAutosize
          minRows={1}
          maxRows={6}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            'w-full resize-none  text-black max-h-[120px]  p-2 pb-3 placeholder:text-[#a4a4a4] focus-visible:outline-none text-sm  disabled:opacity-50 bg-transparent'
          )}
          placeholder="Write somthing"
          value={value}
        />
      </div>
      {fileUpload.length === 0 && (
        <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
          <PopoverTrigger asChild>
            <Button
              className={cn('rounded-2xl  bg-custom_5  text-black h-[40px] w-[40px] p-3')}
              onClick={() => setIsOpenPopover(true)}
            >
              <Icons.moreHorizontal className="w-full h-full" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-30" align="end">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li>
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  className="flex gap-3 items-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <div>
                    <Icons.image className="h-5 w-5" />
                  </div>
                  <Text> Gallery</Text>
                </div>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}

      <Button
        className={cn(
          'rounded-2xl text-[white] bg-[#020817] border-foreground border text-xs  h-[40px] w-[40px] p-3 '
        )}
      >
        <Icons.send className="w-full h-full" />
      </Button>
    </div>
  );
};

export default ChatMessage;
