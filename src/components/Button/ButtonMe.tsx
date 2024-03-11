import { useGetMe } from '@/hooks';
import { Skeleton } from '../ui/skeleton';
import { ButtonSignout } from './ButtonSignout';
import { Separator } from '../ui/separator';
import ButtonUser from './ButtonUser';
import AvatarUser from '../AvatarUser';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

const ButtonMe = () => {
  const { data, isLoading } = useGetMe();
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {isLoading ? (
          <div className="flex items-center space-x-4  w-full">
            <Skeleton className="h-12 w-12 rounded-full bg-foreground" />
          </div>
        ) : (
          <div>
            <AvatarUser
              url={data?.avatar}
              name={data?.username?.[0]}
              classNameAvatar="me-3 border border-gray-500 "
              hasOpenPreview={false}
            />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit p-3" align="start">
        <div className="grid gap-4">
          <ButtonUser />
          <Separator />
          <ButtonSignout />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonMe;
