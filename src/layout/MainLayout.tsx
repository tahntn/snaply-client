import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store';
import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMenuOpen = useGlobalStore((state) => state.isMenuOpen);
  const mobile = '(max-width: 640px)';
  const isMobile = useMediaQuery(mobile);

  return (
    <div>
      {!isMobile ? <SideBar /> : <Header />}

      <div
        className={cn(
          !isMobile ? 'duration-500 h-screen -translate-x-full sm:translate-x-0' : 'pt-16',
          isMenuOpen ? 'sm:ml-64' : 'sm:ml-20'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
