import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { IMessage, IUser } from '@/types';
import { Text } from '@radix-ui/themes';
import moment from 'moment';
import React from 'react';
import reactStringReplace from 'react-string-replace';

const MessageItem: React.FC<IMessage & { currentUser: IUser; hasAvatar: boolean }> = ({
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
}) => {
  return (
    <div
      className={cn(
        'w-full flex items-start gap-4',
        currentUser?.id === senderId?.id && 'justify-end',
        !hasAvatar && 'pl-[54px]'

        // !hasAvatar ? 'py-1' : 'py-3'
      )}
    >
      {hasAvatar && currentUser?.id !== senderId?.id && (
        <Avatar>
          <AvatarImage src={senderId.avatar} />
          <AvatarFallback className="uppercase">{senderId.username?.[0]}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[60%] ',
          'sm:max-w-[80%]',
          'xs:max-w-[70%]',
          type === 'image' && 'md:max-w-[50%]'
        )}
      >
        {hasAvatar && currentUser?.id !== senderId?.id && (
          <div className="pb-2">
            <Text className="text-base pl-1 text-color_brand ">{senderId.username}</Text>
            <Text className=" pl-2 text-color_brand">{moment(createdAt).format('HH:mm')}</Text>
          </div>
        )}
        {hasAvatar && currentUser?.id === senderId?.id && (
          <div className="pb-2 flex justify-end">
            {/* <Text className="text-base pl-1 text-color_brand ">{senderId.username}</Text> */}
            <Text className=" pr-2 text-color_brand ">{moment(createdAt).format('HH:mm')}</Text>
          </div>
        )}
        <div
          className={cn(
            type === 'text' && 'bg-custom_2 shadow px-3 py-3  break-words rounded-xl text-md ',
            type === 'text' && currentUser?.id === senderId?.id && ' text-background bg-foreground'
          )}
        >
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
                    <a key={i} href={match} target="_blank" rel="noreferrer" className="underline">
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
              {imageList?.map((image) => (
                <img
                  src={image}
                  className="max-w-[calc(calc(100%/3)-6px)] object-cover border rounded-xl shadow-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
