import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { Box, Text } from '@radix-ui/themes';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import SettingItem from './SettingItem';
import { settingList } from '@/constants/setting';
import { useTranslation } from 'react-i18next';

const SettingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      className={cn(
        'bg-gray-100 max-w-[100%]',
        'dark:bg-black_custom-500',
        'xl:max-w-[30%] lg:max-w-[40%] md:max-w-[50%] sm:max-w-[100%]',
        'lg:text-[16px]'
      )}
    >
      <Box className="overflow-y-auto overflow-x-hidden h-screen p-6">
        <Box className="flex items-center gap-4">
          <Icons.chevronLeft
            className={cn(
              'cursor-pointer w-10 h-10 p-2 box-border rounded-full',
              'hover:bg-gray-500 transition-all duration-150 linear'
            )}
          />
          <Text className="font-bold text-2xl">{t('setting.title')}</Text>
        </Box>
        {/* Avatar */}
        <Box className="mt-4  flex items-center justify-between p-4 pr-0 box-border w-full cursor-pointer">
          <Box className="flex gap-6">
            <Avatar className="!w-[56px] !h-[56px]">
              <AvatarImage src="https://source.unsplash.com/random" />
            </Avatar>
            <h2 className={`self-center text-xl font-semibold whitespace-nowrap dark:text-white`}>
              <h3 className="text-lg  font-bold whitespace-nowrap dark:text-white line-clamp-1">
                tahn
              </h3>
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-400 line-clamp-1">
                ntnhat.267@gmail.com
              </h4>
            </h2>
          </Box>
        </Box>
        {/* List options */}
        <Box className="mt-4 flex flex-col ">
          {settingList(t)?.map((settingItem) => (
            <SettingItem
              key={settingItem.id}
              title={settingItem.title}
              Icon={settingItem.Icon}
              isDarkMode={settingItem?.id === 'darkMode'}
              isLanguage={settingItem?.id === 'language'}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SettingPage;
