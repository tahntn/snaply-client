import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Box, Text } from '@radix-ui/themes';

const ChatElement = () => {
  return (
    <Box
      className={cn(
        'w-full rounded-xl p-4 bg-white cursor-pointer relative',
        'dark:bg-[#161c24]',
        'hover:bg-gray-200 transition-all ease-linear'
      )}
    >
      <Box className="flex flex-row items-center gap-4">
        <Box className="relative">
          <Avatar>
            <AvatarImage src="https://source.unsplash.com/random" />
          </Avatar>
          <Badge className="absolute bottom-0 right-0 rounded-full p-[5px] bg-green-400" />
        </Box>
        <Box className="flex flex-col gap-[0.2px]">
          <Text className="text-base font-semibold truncate max-w-[320px] opacity-0 lg:opacity-100">
            Tien Nhat Tien Nhat Tien Nhat Tien Nhat Tien Nhat Tien Nhat Tien Nhat Tien Nhat
          </Text>
          <Text className="text-sm">I'm Senior</Text>
        </Box>
      </Box>
      <Text className="text-sm absolute top-3 right-4">10:20</Text>
      <span className="absolute bottom-3 right-4 inline-flex items-center  justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
        2
      </span>
    </Box>
  );
};

export default ChatElement;
