import { InputWithIcon } from '@/components/InputWithIcon';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { Box } from '@radix-ui/themes';
import { Icons } from '@/components/ui/icons';
import { SyntheticEvent, useState } from 'react';
import { useConversationStore } from '@/store';

const GiphySelect = () => {
  const { setGiphyUrl } = useConversationStore((state) => state);

  const WEB_SDK_KEY = import.meta.env.VITE_GIPHY_API_KEY! as string;
  const giphyFetch = new GiphyFetch(WEB_SDK_KEY);
  const [search, setSearch] = useState('');

  const fetchGifs = (offset: number) =>
    giphyFetch.search(search || 'trending', { offset, limit: 10 });

  const onGifClick = (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    setGiphyUrl(gif);
  };

  return (
    <>
      <Box>
        <InputWithIcon
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          startAndornment={<Icons.search className="h-[18px] text-background" />}
          className="p-2 border-none text-background focus:border-none"
        />
      </Box>
      <div className="h-[300px] overflow-y-auto mt-4">
        <Grid
          key={search}
          columns={3}
          gutter={6}
          width={250}
          fetchGifs={fetchGifs}
          onGifClick={onGifClick}
          noLink={true}
          hideAttribution={true}
        />
      </div>
    </>
  );
};

export default GiphySelect;
