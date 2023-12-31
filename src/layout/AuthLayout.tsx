import React from 'react';
import { useTheme } from '@/context/ThemeProvider';

import LogoLight from '../assets/images/logo/logo-light.png';
import LogoDark from '../assets/images/logo/logo-dark.png';
import { ModeToggle } from '@/components/ModeToggle';
import SelectLanguage from '@/components/SelectLanguage';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mainTheme } = useTheme();
  return (
    <div className="flex justify-around min-h-screen">
      <div className="w-1/2 flex items-center justify-center h-screen xs:hidden sm:hidden lg:flex">
        <img
          src={mainTheme === 'light' ? LogoDark : LogoLight}
          className="h-[150px] translate-x-[-5px] duration-300 transition"
          alt="Snaply Logo"
        />
      </div>
      <div className="lg:w-1/2  flex flex-col">
        <div className="flex items-center justify-end px-5 py-5 gap-4">
          <SelectLanguage />
          <ModeToggle />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
