import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useConversationStore } from '@/store';
import { IMessage, IUser } from '@/types';
import { Text } from '@radix-ui/themes';
import moment from 'moment';
import React from 'react';
import TextMessage from './Message/TextMessage';
import ImageMessage from './Message/ImageMessage';
import GifMessage from './Message/GifMessage';
import StickerMessage from './Message/StickerMessage';
import UpdateMessage from './Message/UpdateMessage';
import { DialogPinMessage } from '@/components/Dialog';
import pinImage from '@/assets/images/icons/pin.png';
import AvatarUser from '@/components/AvatarUser';
const MessageItem: React.FC<
  IMessage & {
    currentUser: IUser;
    hasAvatar: boolean;
    isMessagesNew: boolean;
  }
> = (props) => {
  const {
    conversationId,
    createdAt,
    // updatedAt,
    id,
    _id,
    isPin,
    senderId,
    title,
    type,
    currentUser,
    imageList,
    hasAvatar,
    isMessagesNew,
    url,
    replyTo,
  } = props;
  const { setReplyMessage, focusInput } = useConversationStore((state) => state);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full" id={id || _id}>
      {isMessagesNew && (type === 'image' || type === 'text') && (
        <div className="flex w-full justify-center items-center gap-3 px-10 my-4">
          <Separator className="flex-1" />
          <Text>{moment(createdAt).format('DD/MM/YYYY HH:mm')}</Text>
          <Separator className="flex-1" />
        </div>
      )}
      <div
        className={cn(
          'w-full flex items-start gap-4',
          currentUser?.id === senderId?.id && 'justify-end',
          !hasAvatar && currentUser?.id !== senderId?.id && 'ml-[54px]'
        )}
      >
        {/* Avatar */}
        {hasAvatar && currentUser?.id !== senderId?.id && type !== 'update' && (
          <AvatarUser url={senderId?.avatar} name={senderId.username?.[0]} />
        )}

        {/*Info  Message */}
        <div
          className={cn(
            'max-w-[60%] ',
            'sm:max-w-[80%]',
            'xs:max-w-[70%]',
            type === 'image' && 'md:max-w-[50%]',
            type === 'update' && 'w-full sm:max-w-full xs:max-w-full',
            replyTo?.type && 'md:max-w-[50%]'
          )}
        >
          {/* Name sender */}
          {hasAvatar && currentUser?.id !== senderId?.id && type !== 'update' && (
            <div className="pb-2">
              <Text className="text-base pl-1 text-color_brand ">{senderId.username}</Text>
              <Text className=" pl-2 text-color_brand">{moment(createdAt).format('HH:mm')}</Text>
            </div>
          )}
          {/* Time sent */}
          {hasAvatar && currentUser?.id === senderId?.id && type !== 'update' && (
            <div className="pb-2 flex justify-end">
              <Text className=" pr-2 text-color_brand ">{moment(createdAt).format('HH:mm')}</Text>
            </div>
          )}

          {/* Message */}
          <div
            className={cn(
              'group relative',
              type === 'text' && 'bg-custom_2 shadow px-3 py-3  break-words rounded-xl text-md ',
              type === 'text' &&
                currentUser?.id === senderId?.id &&
                ' text-background bg-foreground',
              replyTo?.id && 'mt-[20px]'
            )}
          >
            {replyTo?.id && (
              <div
                className={cn(
                  'shadow-sm shadow-slate-100 dark:shadow-slate-800 px-3 py-2 rounded-sm mb-3'
                )}
              >
                <Icons.reply className="cursor-pointer h-6 w-6 mb-3" />
                {replyTo?.type === 'text' && <TextMessage title={replyTo.title!} />}
                {replyTo.type === 'gif' && (
                  <GifMessage url={replyTo.url!} className="max-h-[200px]" />
                )}
                {replyTo.type === 'sticker' && (
                  <GifMessage url={replyTo.url!} className="max-h-[200px]" />
                )}
                {replyTo.type === 'image' && (
                  <ImageMessage
                    imageList={replyTo.imageList!}
                    classNameWrap={cn(
                      'flex flex-wrap w-full items-stretch gap-1',
                      currentUser?.id === senderId?.id && 'justify-end'
                    )}
                  />
                )}
              </div>
            )}
            {type === 'update' && (
              <UpdateMessage createdAt={createdAt!} user={senderId} title={title!} />
            )}
            {type === 'text' && <TextMessage title={title!} />}
            {type === 'image' && (
              <ImageMessage
                imageList={imageList!}
                classNameWrap={cn(
                  'flex flex-wrap w-full items-stretch gap-1',
                  currentUser?.id === senderId?.id && 'justify-end'
                )}
              />
            )}
            {type === 'gif' && <GifMessage url={url!} />}
            {type === 'sticker' && <StickerMessage url={url!} />}
            {isPin && (
              <div className="absolute top-[-10px] right-[-10px]">
                {/* <Icons.pin className="text-[red]" /> */}
                <img src={pinImage} className="h-5 w-5" />
              </div>
            )}

            {/* Action with message */}
            <div
              className={cn(
                'hidden absolute px-5 group-hover:flex top-1/2 transition transform -translate-y-1/2  gap-2',
                currentUser?.id === senderId?.id ? 'right-full' : 'left-full'
              )}
            >
              {(type === 'text' || type === 'image') && (
                <Button
                  variant="outline"
                  className="rounded-full w-8 h-8 py-0 px-0 flex items-center justify-center"
                  onClick={() => setOpen(true)}
                >
                  {isPin ? (
                    <Icons.pinOff className="text-foreground cursor-pointer h-3 w-3" />
                  ) : (
                    <Icons.pin className="text-foreground cursor-pointer h-3 w-3" />
                  )}
                </Button>
              )}
              <Button
                variant="outline"
                className="rounded-full w-8 h-8 py-0 px-0 flex items-center justify-center"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { hasAvatar, isMessagesNew, ..._props } = props;
                  setReplyMessage(_props);
                  focusInput();
                }}
              >
                <Icons.reply className="text-foreground cursor-pointer h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DialogPinMessage
        open={open}
        setOpen={setOpen}
        isPin={isPin}
        conversationId={conversationId}
        messageId={(id || _id)!}
      />
    </div>
  );
};

export default MessageItem;
