import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import addGroupDark from '@/assets/images/icons/add-group-dark.png';
import addGroupLight from '@/assets/images/icons/add-group-light.png';
import { useTheme } from '@/context/ThemeProvider';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useCreateConversation, useFriendRequest } from '@/hooks';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import AvatarUser from '../AvatarUser';
import { Checkbox } from '../ui/checkbox';
import LoadingComponent from '../LoadingComponent';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import emptyLight from '@/assets/images/icons/empty.png';
import emptyDark from '@/assets/images/icons/empty-dark.png';

const DialogCreateGroupChat = () => {
  const { t } = useTranslation();
  const { mainTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger>
          <DialogTrigger asChild>
            <Button variant="outline" className="p-2 w-10 h-10 rounded-full overflow-hidden   ">
              <img
                src={mainTheme === 'light' ? addGroupLight : addGroupDark}
                className=" object-cover p-0 "
              />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>{t('conversation.group.createGroupChat')}</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100vh-100px)]">
        <DialogHeader>
          <DialogTitle>{t('conversation.group.newGroupChat')}</DialogTitle>
          <DialogDescription>{t('friend.createGroupChat')}</DialogDescription>
        </DialogHeader>
        <div>
          <UserList setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateGroupChat;

const UserList = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { t } = useTranslation();
  const { mainTheme } = useTheme();
  const { mutateAsync: createConversation, isLoading: isLoadingCreateConversation } =
    useCreateConversation();
  const { ref, inView } = useInView();
  const schema = yup.object().shape({
    nameGroup: yup
      .string()
      .required('Group name is required')
      .min(4, 'Group name must be at least 4 characters')
      .max(20, 'Group name must not exceed 20 characters'),
    participants: yup
      .array()
      .of(yup.string())
      .required('Participants are required')
      .min(2, 'At least 2 participants are required'),
  });
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFriendRequest();
  const form = useForm({
    resolver: yupResolver(schema),
    values: {
      participants: [],
      nameGroup: '',
    },
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const onSubmit = (data: { participants: (string | undefined)[]; nameGroup: string }) => {
    createConversation({
      participants: data.participants as string[],
      nameGroup: data.nameGroup,
      isGroup: true,
    });
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingComponent className="h-10 w-10" />
      </div>
    );
  }

  if (isError) {
    return <Navigate replace to={'/conversation'} />;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="overflow-y-auto overflow-x-hidden pr-6 px-1  flex gap-4 pb-1 flex-col max-h-[calc(100vh-300px)] ">
            <FormField
              control={form.control}
              name="nameGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">{t('conversation.group.groupName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('conversation.group.groupName')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participants"
              render={() => (
                <FormItem className="space-y-6">
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      {t('conversation.detailConversation.members')}
                    </FormLabel>
                  </div>
                  {!data?.pages?.[0]?.data?.length && (
                    <div className="flex gap-2 flex-col items-center justify-center  pt-6">
                      <img
                        src={mainTheme === 'dark' ? emptyDark : emptyLight}
                        className="max-h-[100px]"
                      />
                      <h2 className="text-lg font-medium text-center">
                        {t('friend.form.noFriends')}
                      </h2>
                    </div>
                  )}
                  {data.pages?.map((listFriendRequest) =>
                    listFriendRequest?.data?.map((friendRequest) => (
                      <FormField
                        key={friendRequest._id}
                        control={form.control}
                        name="participants"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={friendRequest._id}
                              className="flex flex-row items-center space-x-3 space-y-0 justify-between"
                            >
                              <FormLabel className="text-sm font-normal">
                                <div className="flex items-center gap-3">
                                  <AvatarUser
                                    url={friendRequest.user.avatar}
                                    name={friendRequest.user.username}
                                    classNameAvatar="w-12 h-12"
                                  />
                                  <h3 className="flex-1 text-xl font-medium">
                                    {friendRequest.user.username}
                                  </h3>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(friendRequest.user._id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, friendRequest.user._id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== friendRequest.user._id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    ))
                  )}
                  {isFetchingNextPage && (
                    <div className="h-full w-full flex items-center justify-center my-10">
                      <LoadingComponent className="h-10 w-10" />
                    </div>
                  )}
                  <div ref={ref} />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className=" flex justify-end gap-3 ">
            <Button
              size={'sm'}
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => setOpen(false)}
            >
              {t('setting.close')}
            </Button>
            <Button className="" type="submit" disabled={!form.formState.isValid}>
              {t('setting.submit')}
              {isLoadingCreateConversation && (
                <LoadingComponent className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
