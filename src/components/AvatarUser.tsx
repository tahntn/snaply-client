import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Box } from '@radix-ui/themes';
import { cn } from '@/lib/utils';

interface AvatarUserProps {
  name: string;
  url: string;
  classNameAvatar?: string;
}

const AvatarUser: React.FC<AvatarUserProps> = ({ name, url, classNameAvatar }) => {
  return (
    <Box className="relative">
      <Avatar className={cn('border-2 border-background w-9 h-9', classNameAvatar)}>
        <AvatarImage src={url} />
        <AvatarFallback className="uppercase">{name[0]}</AvatarFallback>
      </Avatar>

      {/* <Badge className="absolute top-0 right-0 rounded-full border-2 border-background p-[4px] bg-green-400" /> */}
    </Box>
  );
};

export default AvatarUser;
