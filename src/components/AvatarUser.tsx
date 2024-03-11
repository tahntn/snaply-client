import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store';

interface AvatarUserProps {
  name?: string;
  url?: string;
  classNameAvatar?: string;
  hasOpenPreview?: boolean;
}

const AvatarUser: React.FC<AvatarUserProps> = ({
  name,
  url,
  classNameAvatar,
  hasOpenPreview = true,
}) => {
  const handleOpenDialogImage = useGlobalStore((state) => state.handleOpenDialogImage);
  return (
    // <Box className="relative">
    <Avatar className={cn('border border-input ', classNameAvatar)}>
      <AvatarImage
        src={url}
        className={cn(
          hasOpenPreview && url && 'transition-transform transform  cursor-pointer hover:scale-125'
        )}
        onClick={() => {
          if (hasOpenPreview && url) {
            handleOpenDialogImage(url);
          }
        }}
      />
      <AvatarFallback className="uppercase">{name?.[0] || 'Snaply'}</AvatarFallback>
    </Avatar>

    // {/* <Badge className="absolute top-0 right-0 rounded-full border-2 border-background p-[4px] bg-green-400" /> */}
    // </Box>
  );
};

export default AvatarUser;
