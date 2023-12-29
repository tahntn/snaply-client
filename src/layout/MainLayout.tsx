import { ModeToggle } from '@/components/ModeToggle';
import SideBar from '@/components/SideBar';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store';
import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMenuOpen = useGlobalStore((state) => state.isMenuOpen);
  return (
    <div>
      <SideBar />
      <div
        className={cn(
          'p-4  duration-500   -translate-x-full sm:translate-x-0',
          isMenuOpen ? 'sm:ml-64' : 'sm:ml-20'
        )}
      >
        <ModeToggle />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
