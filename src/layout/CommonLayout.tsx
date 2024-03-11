import NoChat from '@/components/NoChat';
import { cn } from '@/lib/utils';
import React from 'react';

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className={cn('h-full w-full flex')}>
      <div
        className={cn(
          'bg-gray-100 max-w-[100%] h-full',
          'dark:bg-black_custom-500',
          'xl:min-w-[30%] lg:min-w-[40%] md:min-w-[50%] sm:min-w-full xs:min-w-full',
          'lg:text-[16px]'
        )}
      >
        {children}
      </div>
      <div className="flex-1">
        <NoChat />
      </div>
    </div>
  );
};

export default CommonLayout;
