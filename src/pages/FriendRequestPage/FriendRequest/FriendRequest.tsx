import { useTranslation } from 'react-i18next';
import { Box, Text } from '@radix-ui/themes';
import FriendRequestList from './component/FriendRequestList';

const FriendRequest: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box className="h-screen relative">
      <Box className="absolute w-full p-6 pb-0 bg-gray-100 dark:bg-black_custom-500 z-[10]">
        <Box>
          <Text className="font-bold text-2xl">{t('friendRequest.title')}</Text>
        </Box>
        <div className="border-b border-gray-300 my-4"></div>
      </Box>
      <FriendRequestList />
    </Box>
  );
};

export default FriendRequest;
