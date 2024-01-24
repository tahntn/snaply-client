import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GiphySelect from './GiphySelect';
import { useConversationStore } from '@/store';
import StickerSelect from './StickerSelect';
import { useTranslation } from 'react-i18next';

const SelectStickerOrGif = () => {
  const { handleOpenGif, valueGif } = useConversationStore((state) => state);
  const { t } = useTranslation();
  return (
    <div className="pb-3">
      <Tabs defaultValue={valueGif} className="w-full">
        <div className="flex items-center">
          <div className="flex-1 flex justify-center ">
            <TabsList className="grid w-1/2 grid-cols-2">
              <TabsTrigger value="sticker">{t('message.more.sticker')}</TabsTrigger>
              <TabsTrigger value="gif">{t('message.more.gif')}</TabsTrigger>
            </TabsList>
          </div>
          <Button className="w-4 h-4 p-1 rounded-full" onClick={() => handleOpenGif('gif')}>
            <Icons.close />
          </Button>
        </div>
        <TabsContent value="gif">
          <GiphySelect />
        </TabsContent>
        <TabsContent value="sticker">
          <StickerSelect />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelectStickerOrGif;
