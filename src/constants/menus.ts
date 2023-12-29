import { Icons } from '@/components/ui/icons';

export const mainMenus = [
  {
    id: 'search',
    link: '/search',
    title: 'Search',
    icon: Icons.search,
  },
  {
    id: 'conversation',
    link: 'conversation',
    title: 'Conversation',
    icon: Icons.messageCircleMore,
  },
  {
    id: 'friend',
    link: 'friend',
    title: 'Friend',
    icon: Icons.users,
  },
  {
    id: 'friend-request',
    link: 'friend-request',
    title: 'Friend request',
    icon: Icons.userRoundPlus,
    noti: 2,
  },
];

export const subMenus = [
  {
    id: 'setting',
    link: '/setting',
    title: 'Setting',
    icon: Icons.settings,
  },
  {
    id: 'contact-us',
    link: '/contact-us',
    title: 'Contact us',
    icon: Icons.contact,
  },
];
