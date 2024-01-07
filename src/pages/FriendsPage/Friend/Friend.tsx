import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@radix-ui/themes';
import { InputWithIcon } from '@/components/InputWithIcon';
import { Icons } from '@/components/ui/icons';
import FriendList from './component/FriendList';

const Friend: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box className="h-full">
      <Box className="p-6">
        <Box>
          <Text className="font-bold text-2xl">{t('friend.title')}</Text>
        </Box>
        <Box className="mt-4">
          <InputWithIcon
            startAndornment={<Icons.search className="h-[18px] text-black-500" />}
            className="p-2 border-none"
            placeholder={t('friend.form.placeholderSearch')}
          />
        </Box>
        <div className="border-b border-gray-300 my-6"></div>
        <FriendList />
      </Box>
    </Box>
  );
};

export default Friend;
