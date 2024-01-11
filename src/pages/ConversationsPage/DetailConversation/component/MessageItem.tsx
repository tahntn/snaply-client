import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { IMessage, IUser } from '@/types';
import { Text } from '@radix-ui/themes';
import React from 'react';
import reactStringReplace from 'react-string-replace';

const MessageItem: React.FC<IMessage & { currentUser: IUser }> = ({
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
}) => {
  return (
    <div
      className={cn(
        'w-full flex items-end gap-4',
        currentUser?.id === senderId?.id && 'justify-end'
      )}
    >
      {currentUser?.id !== senderId?.id && (
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
          type === 'text' && 'bg-slate-50 shadow px-3 py-3  break-words rounded-md text-xl ',
          type === 'text' && currentUser?.id !== senderId?.id && 'bg-gray-200'
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
  );
};

export default MessageItem;
