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
  const { mutateAsync, isLoading } = usePinMessage(conversationId, messageId, () => {
    //xử lý trong queryclient (để sau làm)
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
