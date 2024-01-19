import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useConversationStore, useGlobalStore } from '@/store';
import { IMessage, IUser } from '@/types';
import { Icon } from '@radix-ui/react-select';
import { Text } from '@radix-ui/themes';
import moment from 'moment';
import React from 'react';
import reactStringReplace from 'react-string-replace';

const MessageItem: React.FC<
  IMessage & { currentUser: IUser; hasAvatar: boolean; isMessagesNew: boolean }
> = (props) => {
  const {
    conversationId,
    createdAt,
    updatedAt,
    id,
    isPin,
    senderId,
    title,
    type,
    currentUser,
    imageList,
    hasAvatar,
    isMessagesNew,
  } = props;
  const setReplyMessage = useConversationStore((state) => state.setReplyMessage);
  const handleOpenDialogImage = useGlobalStore((state) => state.handleOpenDialogImage);

  return (
    <div className="w-full">
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
        {hasAvatar && currentUser?.id !== senderId?.id && (
          <Avatar>
            <AvatarImage src={senderId.avatar} />
            <AvatarFallback className="uppercase">{senderId.username?.[0]}</AvatarFallback>
          </Avatar>
        )}

        {/*Info  Message */}
        <div
          className={cn(
            'max-w-[60%] ',
            'sm:max-w-[80%]',
            'xs:max-w-[70%]',
            type === 'image' && 'md:max-w-[50%]',
            type === 'update' && 'w-full sm:max-w-full'
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
                ' text-background bg-foreground'
            )}
          >
            {type === 'update' && (
              <h4 className={cn('text-center')}>
                {senderId?.username}{' '}
                {title === 'new'
                  ? 'đã tạo cuộc trò chuyện'
                  : title === 'change_name_group'
                  ? 'đã thay đổi tên nhóm'
                  : 'đã thay đổi ảnh nhóm'}
              </h4>
            )}
            {type === 'text' && (
              <Text className={cn()}>
                {reactStringReplace(
                  reactStringReplace(
                    reactStringReplace(title, /(\n)/g, (_match, i) => (
                      <React.Fragment key={i}>
                        <br />
                      </React.Fragment>
                    )),
                    /(https?:\/\/[^\s]+)/g,
                    (match, i) => (
                      <a
                        key={i}
                        href={match}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {match}
                      </a>
                    )
                  ),
                  /(\s+)/g,
                  (match, i) => (
                    <React.Fragment key={i}>{match.replace(/ /g, '\u00a0')}</React.Fragment>
                  )
                )}
              </Text>
            )}
            {type === 'image' && (
              <div
                className={cn(
                  'flex flex-wrap w-full items-stretch gap-1',
                  currentUser?.id === senderId?.id && 'justify-end '
                )}
              >
                {imageList?.map((image, index) => {
                  const total = imageList.length;
                  let widthItem = 1;
                  if (total % 3 === 1) {
                    if (index === total - 1) {
                      widthItem = 3;
                    }
                  } else if (total % 3 === 2) {
                    if (index >= total - 2) {
                      widthItem = 2;
                    }
                  }
                  return (
                    <div
                      key={index}
                      className={cn(
                        'max-h-[175px] border rounded-xl overflow-hidden group/image relative ',
                        widthItem === 1 && 'w-[calc(calc(100%/3)-3px)]',
                        widthItem === 2 && 'w-[calc(calc(100%/2)-2px)]',
                        widthItem === 3 && 'w-[calc(calc(100%/1)-0px)]'
                      )}
                    >
                      <img
                        src={image}
                        className={cn(
                          ' object-cover  shadow-lg w-full h-full transition-transform transform group-hover/image:scale-105'
                        )}
                      />
                      <div
                        className={cn(
                          'hidden absolute cursor-pointer group-hover/image:block  inset-0 bg-black bg-opacity-50 opacity-0 group-hover/image:opacity-100 transition-opacity',
                          'group-hover/image:flex group-hover/image:items-center group-hover/image:justify-center'
                        )}
                        onClick={() => {
                          handleOpenDialogImage(image);
                        }}
                      >
                        <Button className="bg-transparent text-white ">
                          <Icons.eye className="mr-2" /> Preview image
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* Action with message */}
            <div
              className={cn(
                'hidden absolute px-5 group-hover:block top-1/2 transition transform -translate-y-1/2 ',
                currentUser?.id === senderId?.id ? 'right-full' : 'left-full'
              )}
            >
              <Button
                variant="outline"
                className="rounded-full w-8 h-8 py-0 px-0 flex items-center justify-center"
                onClick={() => {
                  const { hasAvatar, isMessagesNew, ..._props } = props;
                  setReplyMessage(_props);
                }}
              >
                <Icons.reply className="text-foreground cursor-pointer h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
