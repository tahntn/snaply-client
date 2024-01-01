import { TFunction } from 'i18next';
import {
  Bell,
  CircleUserRound,
  FileText,
  HelpCircle,
  Languages,
  Palette,
  SunMoon,
} from 'lucide-react';

export const settingList = (t: TFunction<'translation', undefined>) => [
  {
    id: 'language',
    title: t('setting.option.language'),
    Icon: Languages,
  },
  {
    id: 'darkMode',
    title: t('setting.option.darkMode'),
    Icon: SunMoon,
  },
  {
    id: 'account',
    title: t('setting.option.account'),
    Icon: CircleUserRound,
  },
  {
    id: 'notifications',
    title: t('setting.option.notifications'),
    Icon: Bell,
  },
  {
    id: 'theme',
    title: t('setting.option.theme'),
    Icon: Palette,
  },
  {
    id: 'help',
    title: t('setting.option.help'),
    Icon: HelpCircle,
  },
  {
    id: 'faq',
    title: t('setting.option.faq'),
    Icon: FileText,
  },
];
