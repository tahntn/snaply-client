/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { usePinMessage } from '@/hooks';
import LoadingComponent from '../LoadingComponent';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { IDetailConversation } from '@/types';
interface DialogPinMessageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPin: boolean;
  conversationId: string;
  messageId: string;
}

const DialogPinMessage: React.FC<DialogPinMessageProps> = ({
  open,
  setOpen,
  isPin,
  conversationId,
  messageId,
}) => {
  const { t } = useTranslation();
  const queryclient = useQueryClient();
  const { mutateAsync, isLoading } = usePinMessage(conversationId, messageId, (data) => {
    queryclient.setQueryData(['conversation', conversationId], (prev?: IDetailConversation) => {
      return {
        ...prev!,
        pinnedMessagesCount: prev!.pinnedMessagesCount + (isPin ? -1 : 1),
      };
    });
    queryclient.setQueryData(['messages', conversationId], (prev: any) => {
      const updatedPages = prev.pages.map((page: any) => ({
        ...page,
        data: page.data.map((message: any) => {
          if (message.id === messageId || message._id === messageId) {
            return { ...message, isPin: data.isPin };
          }
          return message;
        }),
      }));
      return {
        pageParams: prev.pageParams,
        pages: updatedPages,
      };
    });
    const pinnedMessages = queryclient.getQueryData(['pinned-messages', conversationId]);
    if (pinnedMessages) {
      queryclient.setQueryData(['pinned-messages', conversationId], (oldData: any) => {
        if (!isPin) {
          return {
            pages: [{ data: [data] }, ...oldData.pages],
            pageParams: [...oldData.pageParams],
          };
        }
        const updatedPages = oldData.pages.map((page: any) => ({
          data: page.data.filter((message: any) => {
            return message.id !== messageId;
          }),
        }));

        return {
          pageParams: oldData.pageParams,
          pages: updatedPages.map((page: any, index: number) => ({
            data: page.data,
            pagination: oldData.pages?.[index]?.pagination,
          })),
        };
      });
    }
  });
  const handleSubmit = () => {
    mutateAsync();
    setOpen(false);
    toast.success(
      isPin ? t('message.pin.unpinMessageSuccess') : t('message.pin.pinMessageSuccess')
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {isPin ? t('message.pin.unpinMessage') : t('message.pin.pinMessage')}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {isPin ? t('message.pin.confirmUnpinMessage') : t('message.pin.confirmPinMessage')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size={'sm'} type="button" variant="outline" disabled={isLoading}>
              {t('setting.close')}
            </Button>
          </DialogClose>
          <Button size={'sm'} onClick={handleSubmit} disabled={isLoading}>
            {t('setting.submit')}
            {isLoading && <LoadingComponent className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPinMessage;
