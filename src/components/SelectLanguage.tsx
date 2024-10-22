import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from '@/lib/utils';

const SelectLanguage = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('snaply-language', lang);
  };
  return (
    <Select onValueChange={(value) => onChangeLanguage(value)} value={i18n.language}>
      <SelectTrigger className={cn('w-[180px]', '2xl:w-[180px] xl:w-[180px] lg:w-[140px]')}>
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="en">en English</SelectItem>
          <SelectItem value="vi">vn Vietnamese</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectLanguage;
