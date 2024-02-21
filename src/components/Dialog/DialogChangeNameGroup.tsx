import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '../ui/icons';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateGroupConversation } from '@/hooks';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IDetailConversation } from '@/types';
import LoadingComponent from '../LoadingComponent';
interface DialogChangeNameGroupProps {
  nameGroup: string;
  idConversation: string;
}

const DialogChangeNameGroup: React.FC<DialogChangeNameGroupProps> = ({
  nameGroup,
  idConversation,
}) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const schema = yup.object().shape({
    name: yup.string().required(),
  });
  const { mutate: updateConversation, isLoading } = useUpdateGroupConversation(
    idConversation,
    () => {
      queryClient.setQueryData(['conversation', idConversation], (prev?: IDetailConversation) => {
        return {
          ...prev!,
          nameGroup: form.getValues('name'),
        };
      });
      setOpen(false);
    }
  );
  const form = useForm({
    resolver: yupResolver(schema),
    values: {
      name: nameGroup || '',
    },
  });

  const onSubmit = ({ name }: { name: string }) => {
    if (name.trim() === nameGroup) {
      setOpen(false);
      return;
    }
    updateConversation({
      nameGroup: name,
    });
  };

  React.useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className={cn(
            'flex border items-center justify-center rounded-full cursor-pointer',
            'h-[30px] w-[30px] '
          )}
        >
          <Icons.pencil className="w-[10px] h-[10px ]" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change name group?</DialogTitle>
          <DialogDescription>
            Changing the name of group chat changes it for everyone
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Name group"
                        className="w-full resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button size={'sm'} type="button" variant="secondary" disabled={isLoading}>
                  Close
                </Button>
              </DialogClose>
              <Button size={'sm'} disabled={isLoading} type="submit">
                Submit
                {isLoading && <LoadingComponent className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogChangeNameGroup;
