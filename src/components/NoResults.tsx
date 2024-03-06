import noResultsDark from '@/assets/images/icons/no-results.png';
import noResultsLight from '@/assets/images/icons/no-results_light.png';
import { useTheme } from '@/context/ThemeProvider';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
interface NoResultsProps {
  classNameWrap?: string;
  classNameImg?: string;
  classNameText?: string;
}

const NoResults: React.FC<NoResultsProps> = ({ classNameWrap, classNameImg, classNameText }) => {
  const { mainTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <div className={cn(' flex flex-col items-center', classNameWrap)}>
      <img
        src={mainTheme === 'light' ? noResultsDark : noResultsLight}
        alt="no_result"
        className={cn('h-20 mb-3', classNameImg)}
      />
      <p className={cn('text-center text-xl font-semibold', classNameText)}>
        {t('search.noResultsFound')}
      </p>
    </div>
  );
};

export default NoResults;
