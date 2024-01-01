import { Box, Text } from '@radix-ui/themes';
import { InputWithIcon } from '@/components/InputWithIcon';
import { Icons } from '@/components/ui/icons';
import ChatElement from './component/ChatElement';
import { useTranslation } from 'react-i18next';

const ConversationList = () => {
  const { t } = useTranslation();

  return (
    <Box className="h-full">
      <Box className="p-6">
        <Box>
          <Text className="font-bold text-2xl">{t('conversation.title')}</Text>
        </Box>
        <Box className="mt-4">
          <InputWithIcon
            startAndornment={<Icons.search className="h-[18px] text-black-500" />}
            className="p-2 border-none"
            placeholder={t('conversation.form.placeholderSearch')}
          />
        </Box>
        <div className="border-b border-gray-300 my-6"></div>
        <Box className="flex gap-5 flex-col overflow-y-auto max-h-[750px] pr-4 overflow-x-hidden">
          <Text className="text-lg font-semibold">{t('conversation.allConversation')}</Text>
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
          <ChatElement />
        </Box>
      </Box>
    </Box>
  );
};

export default ConversationList;
