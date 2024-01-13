import { useTranslation } from 'react-i18next';
import { Box, Text } from '@radix-ui/themes';
import FriendRequestList from './component/FriendRequestList';

const FriendRequest: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box className="h-full">
      <Box className="p-6">
        <Box>
          <Text className="font-bold text-2xl">{t('friendRequest.title')}</Text>
        </Box>
        <div className="border-b border-gray-300 my-6"></div>
        <FriendRequestList />
      </Box>
    </Box>
  );
};

export default FriendRequest;
