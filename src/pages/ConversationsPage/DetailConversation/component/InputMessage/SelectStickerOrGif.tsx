import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GiphySelect from './GiphySelect';
import { useConversationStore } from '@/store';

const SelectStickerOrGif = () => {
  const { handleOpenGif } = useConversationStore((state) => state);
  return (
    <div className="pb-3">
      <Tabs defaultValue="gif" className="w-full">
        <div className="flex items-center">
          <div className="flex-1 flex justify-center ">
            <TabsList className="grid w-1/2 grid-cols-2">
              <TabsTrigger value="sticker">Sticker</TabsTrigger>
              <TabsTrigger value="gif">Gif</TabsTrigger>
            </TabsList>
          </div>
          <Button className="w-4 h-4 p-1 rounded-full" onClick={handleOpenGif}>
            <Icons.close />
          </Button>
        </div>
        <TabsContent value="gif">
          <GiphySelect />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelectStickerOrGif;
