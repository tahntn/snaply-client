import { useSendMessage } from '@/hooks';
import { useParams } from 'react-router-dom';

const StickerSelect = () => {
  const { conversationId } = useParams();
  const { mutate: sendMessage } = useSendMessage(conversationId!);

  const handleStickerClick = (sticker: string) => {
    sendMessage({
      type: 'sticker',
      url: sticker,
    });
  };
  return (
    <div className="pb-2 mb-2 border-b ">
      <div className=" overflow-y-auto max-h-[275px] mt-4 w-full grid grid-cols-6 gap-4">
        {Array.from(Array(42)).map((_, index) => (
          <img
            src={`https://themes.pixelstrap.com/chitchat/assets/images/sticker/${index + 1}.gif`}
            onClick={() =>
              handleStickerClick(
                `https://themes.pixelstrap.com/chitchat/assets/images/sticker/${index + 1}.gif`
              )
            }
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default StickerSelect;
