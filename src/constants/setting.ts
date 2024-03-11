import { TFunction } from 'i18next';
import { Bell, CircleUserRound, FileText, HelpCircle, Languages, Palette } from 'lucide-react';

export const settingList = (t: TFunction<'translation', undefined>) => {
  return [
    {
      id: 'language',
      title: t('setting.option.language'),
      Icon: Languages,
    },
    {
      id: 'theme',
      title: t('setting.option.theme'),
      Icon: Palette,
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
};
