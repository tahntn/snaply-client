import { InputWithIcon } from '@/components/InputWithIcon';
import { Icons } from '@/components/ui/icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SearchInput: FC<SearchInputProps> = ({ value, setValue }) => {
  const { t } = useTranslation();

  return (
    <div className="px-3">
      <InputWithIcon
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        startAndornment={<Icons.search className="h-[18px] text-background" />}
        className="p-2 border-none text-background"
        placeholder={t('search.placeholder')}
      />
    </div>
  );
};

export default SearchInput;
