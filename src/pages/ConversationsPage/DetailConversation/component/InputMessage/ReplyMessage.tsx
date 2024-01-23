import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useGetMe } from '@/hooks';
import { useConversationStore } from '@/store';
import { Text } from '@radix-ui/themes';

const ReplyMessage = () => {
  const { replyMessage, resetReplyMessage } = useConversationStore((state) => state);
  const { data: currentUser } = useGetMe();
  return (
    <div className="w-full px-3 py-2 flex flex-col justify-center bg-[#0006] my-2 rounded-md ">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Icons.reply />
          <Text className="font-bold">
            {currentUser?.id === replyMessage?.senderId.id
              ? ' Đang trả lời chính mình'
              : `Đang trả lời ${replyMessage?.senderId?.username}`}
          </Text>
        </div>
        <Button
          variant={'outline'}
          className="rounded-full  py-0 px-0 w-5 h-5"
          onClick={() => {
            resetReplyMessage();
          }}
        >
          <Icons.close className="" />
        </Button>
      </div>
      <div className="max-w-[75%]">
        {
          <p className="line-clamp-1">
            {replyMessage?.type === 'text' ? replyMessage?.title : 'Hình ảnh'}
          </p>
        }
      </div>
    </div>
  );
};

export default ReplyMessage;
