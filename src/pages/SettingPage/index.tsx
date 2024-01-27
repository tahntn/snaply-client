import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { Box, Text } from '@radix-ui/themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import SettingItem from './SettingItem';
import { settingList } from '@/constants/setting';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeProvider';
import { useGetMe } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';

const SettingPage: React.FC = () => {
  const { t } = useTranslation();
  const { mainTheme } = useTheme();
  const { data, isLoading } = useGetMe();
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
          <Box className="flex gap-6 w-full">
            {isLoading ? (
              <div className="flex items-center space-x-4  w-full">
                <Skeleton className="h-12 w-12 rounded-full bg-foreground" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full bg-foreground " />
                  <Skeleton className="h-4 w-3/4 bg-foreground" />
                </div>
              </div>
            ) : (
              <>
                <Avatar className="!w-[56px] !h-[56px] border border-gray-500">
                  <AvatarImage src={data?.avatar} />
                  <AvatarFallback className="uppercase">{data?.username?.[0]}</AvatarFallback>
                </Avatar>
                <h2
                  className={`self-center text-xl font-semibold whitespace-nowrap dark:text-white`}
                >
                  <h3 className="text-lg  font-bold whitespace-nowrap dark:text-white line-clamp-1">
                    {data?.username}
                  </h3>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-400 line-clamp-1">
                    {data?.email}
                  </h4>
                </h2>
              </>
            )}
          </Box>
        </Box>
        {/* List options */}
        <Box className="mt-4 flex flex-col ">
          {settingList(t, mainTheme)?.map((settingItem) => (
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
