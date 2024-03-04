import { useTranslation } from 'react-i18next';

import { Box, Text } from '@radix-ui/themes';
// import { InputWithIcon } from '@/components/InputWithIcon';
// import { Icons } from '@/components/ui/icons';
import ConversationList from './component/ConversationList';
import DialogCreateGroupChat from '@/components/Dialog/DialogCreateGroupChat';

const Conversation = () => {
  const { t } = useTranslation();
  return (
    <Box className="h-full">
      <Box className="p-6">
        <Box className="flex items-center justify-between">
          <Text className="font-bold text-2xl">{t('conversation.title')}</Text>
          <DialogCreateGroupChat />
        </Box>
        {/* <Box className="mt-4">
          <InputWithIcon
            startAndornment={<Icons.search className="h-[18px] text-border" />}
            className="p-2 border-none"
            placeholder={t('conversation.form.placeholderSearch')}
          />
        </Box> */}
        <div className="border-b border-gray-300 my-6"></div>
        <ConversationList />
      </Box>
    </Box>
  );
};

export default Conversation;
