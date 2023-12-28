import { ModeToggle } from '@/components/ModeToggle';
import SideBar from '@/components/SideBar';
import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <SideBar />
      <div className="p-4 sm:ml-64">
        <ModeToggle />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
