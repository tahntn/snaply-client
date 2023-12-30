import { InputWithIcon } from '@/components/InputWithIcon';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { fieldAuth } from '@/types';
import React from 'react';

const FormFieldAuth: React.FC<fieldAuth> = ({
  form,
  label,
  name,
  startAndornment,
  endAndornment,
  placeholder,
  type = 'text',
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn('text-2xl  ', 'lg:text-primary-foreground', 'xs:text-xl xxs:text-lg')}
          >
            {label}
          </FormLabel>
          <FormControl>
            <InputWithIcon
              startAndornment={<div className="text-black_custom-500">{startAndornment}</div>}
              endAndornment={
                <div className="text-black_custom-500 cursor-pointer ">{endAndornment}</div>
              }
              placeholder={placeholder}
              {...field}
              type={type}
              className={cn(
                'h-12 text-black_custom-500 px-3 text:text-primary-foreground',
                'xs:h-10 text-base'
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldAuth;
