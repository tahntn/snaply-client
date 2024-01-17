import { cn } from '@/lib/utils';
import { Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import SearchComponent from './components/SearchComponent';

const SearchPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col">
      <div className="pt-6 pl-6">
        <Text className={cn('text-3xl font-bold')}>{t('search.title')}</Text>
      </div>
      <div className="flex-1">
        <SearchComponent />
      </div>
    </div>
  );
};

export default SearchPage;
