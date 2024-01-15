import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@radix-ui/themes';
import { InputWithIcon } from '@/components/InputWithIcon';
import { Icons } from '@/components/ui/icons';
import FriendList from './component/FriendList';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Friend: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className="h-screen relative">
      <Box className="absolute w-full p-6 pb-0 bg-gray-100 dark:bg-black_custom-500 z-[1000]">
        <Box className="flex justify-between items-center box-border">
          <Text className="font-bold text-2xl">{t('friend.title')}</Text>
          <Plus
            className={cn(
              'text-white bg-foreground p-1 h-7 w-7 cursor-pointer rounded-full',
              'dark:text-background'
            )}
          />
        </Box>
        <Box className="mt-4">
          <InputWithIcon
            onChange={(e) => {
              console.log('a', e.target.value);
            }}
            startAndornment={<Icons.search className="h-[18px] text-background" />}
            className="p-2 border-none text-background"
            placeholder={t('friend.form.placeholderSearch')}
          />
        </Box>
      </Box>
      <FriendList />
    </Box>
  );
};

export default Friend;
