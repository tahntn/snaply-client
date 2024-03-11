import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useSendMessage, useToastError, useUploadFile } from '@/hooks';
import { cn } from '@/lib/utils';
import { useConversationStore } from '@/store';
import React, { KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ButtonEmoji from './ButtonEmoji';
import ButtonMore from './ButtonMore';
import SelectStickerOrGif from './SelectStickerOrGif';
import { useParams } from 'react-router-dom';
import { BASE_URL, axiosInstance } from '@/api/apiConfig';
import ReplyMessage from './ReplyMessage';
import { useUploadImageMessage } from '@/hooks/useUploadImageMessage';
import { IResMessage } from '@/types';
import { useTranslation } from 'react-i18next';

interface ChatMessageProps {}

const ChatMessage: React.FC<ChatMessageProps> = () => {
  const { conversationId } = useParams();
  const { t } = useTranslation();
  const {
    fileUpload,
    addFile,
    deleteFile,
    isOpenGif,
    replyMessage,
    deleteAllFiles,
    resetReplyMessage,
    shouldFocusInput,
  } = useConversationStore((state) => state);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { throwError } = useToastError();
  const { mutateAsync: sendMessage } = useSendMessage(conversationId!);
  const { mutateAsync: uploadImage } = useUploadImageMessage();
  const [value, setValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const { getRootProps, getInputProps } = useUploadFile();
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = React.useRef(new AbortController());
  const sendTypingStatus = async (isTyping: boolean) => {
    try {
      await axiosInstance.post(
        `${BASE_URL}/api/v1/conversation/${conversationId}/typing`,
        {
          isTyping: isTyping,
        },
        { signal: abortControllerRef.current.signal }
      );
    } catch (error) {
      throwError(error);
    }
  };

  const handleChangeMessage = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      await sendTypingStatus(true);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      setIsTyping(false);
      await sendTypingStatus(false);
    }, 1000);
  };

  const handleFileUpload = (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    return new Promise<IResMessage[]>((resolve, reject) =>
      uploadImage(formData, {
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      })
    );
  };

  const handleSendMessage = async () => {
    try {
      if (fileUpload.length > 0) {
        const resImages = await handleFileUpload(fileUpload);
        if (value.trim()) {
          sendMessage({
            type: 'image',
            imageList: resImages.map((res) => encodeURI(res.url)),
          });
          sendMessage({
            type: 'text',
            title: value.trim(),
            replyTo: replyMessage?.id || replyMessage?._id,
          });
          return;
        }

        sendMessage({
          type: 'image',
          imageList: resImages.map((res) => encodeURI(res.url)),
          replyTo: replyMessage?.id || replyMessage?._id,
        });
        return;
      }
      sendMessage({
        type: 'text',
        title: value.trim(),
        replyTo: replyMessage?.id || replyMessage?._id,
      });
    } catch (error) {
      throwError(error);
    } finally {
      setValue(() => '');
      deleteAllFiles();
      resetReplyMessage();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      if (value.trim() || fileUpload.length > 0) {
        handleSendMessage();
      }
      event.preventDefault();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = e.clipboardData;
    if (clipboardData && clipboardData.items) {
      const newFiles: File[] = [];
      for (const item of clipboardData.items) {
        if (item.type.startsWith('image/')) {
          const blob = item.getAsFile();
          if (blob) {
            newFiles.push(blob);
          }
        }
      }
      addFile(newFiles);
    }
  };

  React.useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.focus();
    }
  }, [shouldFocusInput]);
  return (
    <div className={cn('h-full')}>
      <div>{isOpenGif ? <SelectStickerOrGif /> : null}</div>
      <div className={cn('flex gap-2 px-2 pb-2 items-end h-fit')}>
        <ButtonEmoji setValue={setValue} />

        <div
          className={cn(
            'flex flex-col border border-input rounded-2xl  flex-1 text-sm bg-custom_5 bg-[#f1f1f1] px-3',
            fileUpload.length > 0 ? 'flex-col p-3 gap-1' : 'items-center',
            fileUpload.length === 0 && !isOpenGif
              ? 'max-w-[calc(100%-140px)]'
              : 'max-w-[calc(100%-100px)]'
          )}
        >
          <ReplyMessage />
          {fileUpload.length > 0 && (
            <div className="flex gap-2 items-center h-15  ">
              <div
                {...getRootProps({ className: 'dropzone' })}
                className="h-20 w-20 cursor-pointer   rounded-sm shadow-md overflow-hidden flex items-center justify-center bg-slate-400"
              >
                <input {...getInputProps()} />
                <Icons.imagePlus />
              </div>
              {fileUpload.map((file, index) => (
                <div className="h-20 w-20  rounded-sm shadow-md relative border transition-opacity duration-300 ease-in-out hover:opacity-75">
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index}`}
                    className="h-full w-full object-cover  rounded-sm v"
                  />
                  <div className="absolute h-4 w-4 bg-muted top-[3px] right-[3px] rounded-full shadow-xl flex items-center justify-center cursor-pointer">
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

          <TextareaAutosize
            minRows={1}
            maxRows={6}
            onChange={handleChangeMessage}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className={cn(
              'w-full resize-none  text-black max-h-[120px]  p-2 pb-3 placeholder:text-[#a4a4a4] focus-visible:outline-none text-sm  disabled:opacity-50 bg-transparent'
            )}
            placeholder={t('message.input.placeholder')}
            value={value}
            autoFocus
            ref={textareaRef}
          />
        </div>
        {fileUpload.length === 0 && !isOpenGif && <ButtonMore />}
        <Button
          className={cn(
            'rounded-2xl text-[white] bg-[#020817] border-foreground border text-xs  h-[40px] w-[40px] p-3 '
          )}
          onClick={() => handleSendMessage()}
          disabled={!value.trim() && fileUpload.length === 0}
        >
          <Icons.send className="w-full h-full" />
        </Button>
      </div>
    </div>
  );
};

export default ChatMessage;
