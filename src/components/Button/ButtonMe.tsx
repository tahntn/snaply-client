import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useGetMe } from '@/hooks';
import { Skeleton } from '../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ButtonSignout } from './ButtonSignout';

const ButtonMe = () => {
  const { data, isLoading } = useGetMe();
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        {isLoading ? (
          <div className="flex items-center space-x-4  w-full">
            <Skeleton className="h-12 w-12 rounded-full bg-foreground" />
          </div>
        ) : (
          <Avatar className="me-3 border border-gray-500 ">
            <AvatarImage src={data?.avatar} />
            <AvatarFallback className="uppercase">{data?.username?.[0]}</AvatarFallback>
          </Avatar>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="start">
        <ButtonSignout />
      </PopoverContent>
    </Popover>
  );
};

export default ButtonMe;
