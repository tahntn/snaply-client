import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { useSettingStore } from '@/store';
import { Box } from '@radix-ui/themes';
import { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
interface SettingItemProps {
  Icon: LucideIcon;
  title: string;
  id: string;
}

const SettingItem: React.FC<SettingItemProps> = ({ Icon, title, id }: SettingItemProps) => {
  const { t } = useTranslation();
  const { handleOpenDialogLanguage, handleOpenDialogTheme } = useSettingStore((state) => state);

  const handleClick = () => {
    if (id === 'language') {
      handleOpenDialogLanguage();
      return;
    }

    if (id === 'theme') {
      handleOpenDialogTheme();
      return;
    }
    toast.info(t('setting.featureUnderDevelopment'));
  };
  return (
    <Box
      className="cursor-pointer p-4 pr-0 flex items-center justify-between w-full"
      onClick={handleClick}
    >
      <Box className={cn('flex items-center gap-4', 'lg:gap-3')}>
        <Box>
          <Icon
            className={cn(
              'text-black-500 cursor-pointer w-10 h-10 p-2 box-border bg-gray-300 rounded-full',
              'dark:text-white dark:bg-gray-500',
              'xl:w-10 xl:h-10 lg:w-8 lg:h-8'
            )}
          />
        </Box>
        <Box>{title}</Box>
      </Box>
      <Box>
        <Icons.chevronRight className={cn(' w-6 h-6  box-border rounded-full')} />
      </Box>
    </Box>
  );
};

export default SettingItem;
