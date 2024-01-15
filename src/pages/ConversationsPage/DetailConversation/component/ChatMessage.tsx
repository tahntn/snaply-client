import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useConversationStore } from '@/store';
import { Text } from '@radix-ui/themes';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { setTimeout } from 'timers';

interface ChatMessageProps {}
const ChatMessage: React.FC<ChatMessageProps> = ({}) => {
  const { fileUpload, deleteFile, addFile } = useConversationStore((state) => state);
  const [isOpenPopover, setIsOpenPopover] = React.useState(false);
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    addFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 10,
    validator: (file) => {
      const isDuplicate = fileUpload.some((existingFile) => {
        return file.name === existingFile.name;
      });

      if (isDuplicate) {
        return {
          code: 'file duplicated',
          message: `file duplicated`,
        };
      }

      if (fileUpload?.length > 9) {
        return {
          code: 'max file 10',
          message: `max file 10`,
        };
      }

      return null;
    },
  });
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    //
  };
  return (
    <div
      className={cn(
        'px-2 py-3 flex gap-2 items-center h-full',
        fileUpload.length > 0 && 'items-end'
      )}
    >
      <Button
        className={cn(' rounded-2xl bg-custom_5  text-black', fileUpload.length === 0 && 'h-full')}
      >
        <Icons.smile className="w-4 h-4" />
      </Button>
      <div
        className={cn(
          'flex  border border-input rounded-2xl h-full flex-1 text-sm bg-custom_5   px-3 ',
          fileUpload.length > 0 ? 'flex-col p-3 gap-1' : 'items-center '
        )}
      >
        {fileUpload.length > 0 && (
          <div className="flex gap-2 h-20">
            <input {...getInputProps()} className="h-full w-10" />
            <div
              {...getRootProps({ className: 'dropzone' })}
              className="h-10 w-10   rounded-sm shadow-md overflow-hidden flex items-center justify-center bg-slate-400"
            >
              <input {...getInputProps()} />
              <Icons.imagePlus />
            </div>
            {fileUpload.map((file, index) => (
              <div className="h-10 w-10   rounded-sm shadow-md relative border transition-opacity duration-300 ease-in-out hover:opacity-75">
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
        <textarea
          className={cn(
            'w-full resize-none h-full text-black  p-2 placeholder:text-[#a4a4a4] focus-visible:outline-none text-sm  disabled:opacity-50 bg-transparent'
          )}
          placeholder="Write somthing"
          onPaste={(e) => handlePaste(e)}
        />
      </div>
      {fileUpload.length === 0 && (
        <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                'rounded-2xl  bg-custom_5  text-black',
                fileUpload.length === 0 && 'h-full'
              )}
              onClick={() => setIsOpenPopover(true)}
            >
              <Icons.moreHorizontal className="w-4 h-4" />
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
          'rounded-2xl text-[white] bg-[#020817] border-foreground border text-xs',
          fileUpload.length === 0 && 'h-full'
        )}
      >
        <Icons.send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatMessage;
