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

interface DialogChangeNameGroupProps {
  nameGroup: string;
}

const DialogChangeNameGroup: React.FC<DialogChangeNameGroupProps> = ({ nameGroup }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    values: {
      name: nameGroup || '',
    },
  });

  const onSubmit = () => {};
  return (
    <Dialog>
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
                <Button size={'sm'} type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button size={'sm'} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogChangeNameGroup;
