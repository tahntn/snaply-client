import { cn } from '@/lib/utils';
import React from 'react';

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className={cn('h-screen w-full')}>
      <div
        className={cn(
          'bg-gray-100 max-w-[100%] h-full',
          'dark:bg-black_custom-500',
          'xl:max-w-[30%] lg:max-w-[40%] md:max-w-[50%] sm:max-w-[100%]',
          'lg:text-[16px]'
        )}
      >
        {children}
      </div>
      <div className="flex-1 bg-slate-900"></div>
    </div>
  );
};

export default CommonLayout;
