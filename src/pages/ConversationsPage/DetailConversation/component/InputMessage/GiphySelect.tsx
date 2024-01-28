import { InputWithIcon } from '@/components/InputWithIcon';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { Box } from '@radix-ui/themes';
import { Icons } from '@/components/ui/icons';
import React, { SyntheticEvent, useState } from 'react';
import { useDebounce, useSendMessage } from '@/hooks';
import { useParams } from 'react-router-dom';

const GiphySelect = () => {
  const { conversationId } = useParams();
  const WEB_SDK_KEY = import.meta.env.VITE_GIPHY_API_KEY! as string;
  const { mutate: sendMessage } = useSendMessage(conversationId!);
  const GifMessageRef = React.useRef<HTMLDivElement>(null);
  const giphyFetch = new GiphyFetch(WEB_SDK_KEY);
  const [search, setSearch] = useState('');
  const debouncedValueSearch = useDebounce(search, 500);
  const [widthGifMessage, setWidthGifMessage] = React.useState(0);

  const fetchGifs = (offset: number) =>
    giphyFetch.search(debouncedValueSearch || 'trending', { offset, limit: 10 });

  const onGifClick = (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    console.log(gif);
    sendMessage({
      type: gif.type,
      url: gif.images.original.url,
    });
  };

  React.useEffect(() => {
    if (!GifMessageRef?.current) return;
    const resizeObserver = new ResizeObserver(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      setWidthGifMessage(() => GifMessageRef.current?.clientWidth! - 10);
    });
    resizeObserver.observe(GifMessageRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="pb-2 mb-2 border-b " ref={GifMessageRef}>
      <Box>
        <InputWithIcon
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          startAndornment={<Icons.search className="h-[18px] text-border" />}
          className="px-2 outline-none"
        />
      </Box>
      <div className="h-[250px] overflow-y-auto mt-4 w-full">
        <Grid
          key={debouncedValueSearch}
          columns={3}
          gutter={6}
          width={widthGifMessage}
          fetchGifs={fetchGifs}
          onGifClick={onGifClick}
          noLink={true}
          hideAttribution={true}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default GiphySelect;
