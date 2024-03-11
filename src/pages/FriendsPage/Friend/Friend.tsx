import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@radix-ui/themes';
import { InputWithIcon } from '@/components/InputWithIcon';
import { Icons } from '@/components/ui/icons';
import FriendList from './component/FriendList';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const Friend: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qParam = searchParams.get('q');

  const [searchValue, setSearchValue] = useState(qParam || '');
  const debouncedValueSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValueSearch.trim() && !!debouncedValueSearch.trim()) {
      navigate(`?q=${debouncedValueSearch}`);
    } else {
      navigate('');
    }
  }, [debouncedValueSearch, navigate]);

  return (
    <Box className="h-screen relative">
      <Box className="absolute w-full p-6 pb-0 bg-gray-100 dark:bg-black_custom-500 z-[10]">
        <Box className="flex justify-between items-center box-border">
          <Text className="font-bold text-2xl">{t('friend.title')}</Text>
          <Tooltip>
            <TooltipTrigger asChild>
              <Plus
                className={cn(
                  'text-white bg-foreground p-1 h-7 w-7 cursor-pointer rounded-full',
                  'dark:text-background'
                )}
                onClick={() => navigate('/search')}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('friend.addFriend')}</p>
            </TooltipContent>
          </Tooltip>
        </Box>
        <Box className="mt-4">
          <InputWithIcon
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            startAndornment={<Icons.search className="h-[18px] text-border" />}
            className="p-2 border-none"
            placeholder={t('friend.form.placeholderSearch')}
          />
        </Box>
      </Box>
      <FriendList keyword={debouncedValueSearch} />
    </Box>
  );
};

export default Friend;
