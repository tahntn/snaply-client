import { Icons } from '@/components/ui/icons';
import { TFunction } from 'i18next';

export const mainMenus = (t: TFunction<'translation', undefined>) => [
  {
    id: 'search',
    link: '/search',
    title: t('sidebar.menu.search'),
    icon: Icons.search,
  },
  {
    id: 'conversation',
    link: 'conversation',
    title: t('sidebar.menu.conversation'),
    icon: Icons.messageCircleMore,
  },
  {
    id: 'friend',
    link: 'friend',
    title: t('sidebar.menu.friend'),
    icon: Icons.users,
  },
  {
    id: 'friend-request',
    link: 'friend-request',
    title: t('sidebar.menu.friendRequest'),
    icon: Icons.userRoundPlus,
    noti: 2,
  },
];

export const subMenus = (t: TFunction<'translation', undefined>) => [
  {
    id: 'setting',
    link: '/setting',
    title: t('sidebar.subMenu.setting'),
    icon: Icons.settings,
  },
  {
    id: 'contact-us',
    link: '/contact-us',
    title: t('sidebar.subMenu.contactUs'),
    icon: Icons.contact,
  },
];
