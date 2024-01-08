import { cn } from '@/lib/utils';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from './ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { mainMenus, subMenus } from '@/constants';
import { useGlobalStore } from '@/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LogoLight from '../assets/images/logo/logo-light-none-text.png';
import LogoDark from '../assets/images/logo/logo-dark-none-text.png';
import { useTheme } from '@/context/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useGetMe } from '@/hooks';
import LoadingComponent from './LoadingComponent';
import { Skeleton } from './ui/skeleton';

const SideBar: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useGlobalStore((state) => state);
  const { mainTheme } = useTheme();
  const { t } = useTranslation();
  const { data, isLoading } = useGetMe();
  return (
    <aside
      id="logo-sidebar"
      className={cn(
        'shadow-2xl fixed top-0 left-0 z-40  h-screen duration-500 -translate-x-full',
        'sm:translate-x-0',
        isMenuOpen ? 'w-64' : 'w-20'
      )}
      aria-label="Sidebar"
    >
      <div className={cn('flex flex-col px-3 py-4 h-full bg-gray-50 relative', 'dark:bg-gray-800')}>
        <div className="flex-1">
          <NavLink to={'/conversation'} className="flex items-center ps-2.5 mb-5 ">
            <img
              src={mainTheme === 'light' ? LogoDark : LogoLight}
              className={cn('h-8 translate-x-[-5px]', 'sm:h-9')}
              alt="Snaply Logo"
            />

            <h2
              style={{
                transitionDelay: `50ms`,
              }}
              className={cn(
                `self-center text-xl font-semibold whitespace-nowrap duration-500 translate-y-[-3px]`,
                'dark:text-white',
                !isMenuOpen && 'opacity-0 translate-x-2 overflow-hidden'
              )}
            >
              Snaply
            </h2>
          </NavLink>
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
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="ml-[5px]">{React.createElement(menu.icon)}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={20} className="bg-current">
                      {!isMenuOpen && <p className="text-white dark:text-gray-800">{menu.title}</p>}
                    </TooltipContent>
                  </Tooltip>
                  <div
                    className={`flex-1 flex items-center duration-500  ${
                      !isMenuOpen && 'opacity-0 translate-x-2 overflow-hidden'
                    }`}
                    style={{
                      transitionDelay: `${i + 1}00ms`,
                    }}
                  >
                    <span className="ms-3  flex-1 whitespace-pre">{menu.title}</span>
                    {menu?.noti && (
                      <span className="inline-flex items-center  justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {menu.noti}
                      </span>
                    )}
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-500 dark:border-gray-700 font-medium">
            {subMenus(t).map((menu, i) => (
              <li>
                <NavLink
                  to={menu.link}
                  className="flex items-center  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group"
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="ml-[5px]">{React.createElement(menu.icon)}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={20} className="bg-current">
                      {!isMenuOpen && <p className="text-white dark:text-gray-800">{menu.title}</p>}
                    </TooltipContent>
                  </Tooltip>

                  <span
                    style={{
                      transitionDelay: `${i + 5}00ms`,
                    }}
                    className={`ms-3  flex-1 whitespace-pre duration-200 ${
                      !isMenuOpen && 'opacity-0 translate-x-2 overflow-hidden'
                    }`}
                  >
                    {menu.title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-5">
          <NavLink
            to={'/conversation'}
            className="flex items-center p-[5px] mt-5 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center space-x-4  w-full">
                <Skeleton className="h-12 w-12 rounded-full bg-foreground" />
                {isMenuOpen && (
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full bg-foreground " />
                    <Skeleton className="h-4 w-3/4 bg-foreground" />
                  </div>
                )}
              </div>
            ) : (
              <>
                <Avatar className="me-3 border border-gray-500">
                  <AvatarImage src={data?.data.avatar} />
                  <AvatarFallback className="uppercase">{data?.data.username?.[0]}</AvatarFallback>
                </Avatar>
                <h2
                  style={{
                    transitionDelay: `50ms`,
                  }}
                  className={`self-center text-xl font-semibold whitespace-nowrap dark:text-white duration-500 ${
                    !isMenuOpen && 'opacity-0 translate-x-2 overflow-hidden'
                  }`}
                >
                  <h3 className="text-lg  font-bold whitespace-nowrap dark:text-white line-clamp-1">
                    {data?.data.username}
                  </h3>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-400 line-clamp-1">
                    {data?.data.email}
                  </h4>
                </h2>
              </>
            )}
          </NavLink>
        </div>
        <div
          className={cn(
            'flex items-center justify-end absolute right-0 top-6 bg-gray-800 rounded-full translate-x-2/4',
            'dark:bg-white'
          )}
        >
          <div
            className={`cursor-pointer transition-transform duration-500 transform ${
              isMenuOpen ? 'rotate-0' : 'rotate-180'
            }`}
            onClick={toggleMenu}
          >
            <Icons.chevronLeft className={cn('text-white', 'dark:text-gray-800')} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
