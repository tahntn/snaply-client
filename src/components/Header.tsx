import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/context/ThemeProvider';
import LogoLight from '../assets/images/logo/logo-light-none-text.png';
import LogoDark from '../assets/images/logo/logo-dark-none-text.png';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useTranslation } from 'react-i18next';
import { mainMenus } from '@/constants';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { mainTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <>
      <header className="fixed top-0 h-16  left-0 right-0 z-40 bg-gray-50 dark:bg-gray-800 flex items-center justify-between px-4 ">
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side={'left'}>
            <SheetHeader>
              <SheetTitle>Snaply</SheetTitle>
              <SheetDescription>
                <ul className="space-y-3 font-medium">
                  {mainMenus(t).map((menu, i) => (
                    <li>
                      <NavLink
                        to={menu.link}
                        end
                        className={({ isActive }) =>
                          cn(
                            'flex items-center  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group',
                            isActive ? 'bg-gray-400 dark:bg-gray-700' : 'hi'
                          )
                        }
                      >
                        <div className="ml-[5px]">{React.createElement(menu.icon)}</div>
                        <span className="ms-6  flex-1 whitespace-pre text-start">{menu.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <NavLink to={'/conversation'}>
          <img
            src={mainTheme === 'light' ? LogoDark : LogoLight}
            className={cn('h-8 translate-x-[-5px]', 'sm:h-9')}
            alt="Snaply Logo"
          />
        </NavLink>
      </header>
    </>
  );
};

export default Header;
