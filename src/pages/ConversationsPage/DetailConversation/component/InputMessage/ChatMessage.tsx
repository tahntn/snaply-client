import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useUploadFile } from '@/hooks';
import { cn } from '@/lib/utils';
import { useConversationStore } from '@/store';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ButtonEmoji from './ButtonEmoji';
import ButtonMore from './ButtonMore';
import SelectStickerOrGif from './SelectStickerOrGif';

interface ChatMessageProps {}

const ChatMessage: React.FC<ChatMessageProps> = ({}) => {
  const { fileUpload, deleteFile, isOpenGif } = useConversationStore((state) => state);

  const [value, setValue] = React.useState('');

  const { getRootProps, getInputProps } = useUploadFile();

  return (
    <div className={cn('h-full')}>
      <div>{isOpenGif ? <SelectStickerOrGif /> : null}</div>
      <div className={cn('flex gap-2 px-2 pb-2 items-end h-fit')}>
        <ButtonEmoji setValue={setValue} />

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
        {fileUpload.length === 0 && <ButtonMore />}

        {/* <PopoverClose asChild>
        <button>X</button>
      </PopoverClose> */}
        <Button
          className={cn(
            'rounded-2xl text-[white] bg-[#020817] border-foreground border text-xs  h-[40px] w-[40px] p-3 '
          )}
        >
          <Icons.send className="w-full h-full" />
        </Button>
      </div>
    </div>
  );
};

export default ChatMessage;
