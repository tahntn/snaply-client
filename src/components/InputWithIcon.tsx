import React from 'react';

import { cn } from '@/lib/utils';

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAndornment?: React.ReactNode;
  endAndornment?: React.ReactNode;
  classNameInput?: string;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, classNameInput, startAndornment, type, endAndornment, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 items-center rounded-md border border-input bg-white text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
      >
        {startAndornment}
        <input
          {...props}
          type={type}
          ref={ref}
          className={cn(
            'w-full h-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            classNameInput
          )}
        />
        {endAndornment}
      </div>
    );
  }
);

InputWithIcon.displayName = 'InputWithIcon';

export { InputWithIcon };
