import AvatarConversation from '@/components/Conversation/AvatarConversation';
import LoadingComponent from '@/components/LoadingComponent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { useToastError, useUpdateGroupConversation, useUploadSingleImage } from '@/hooks';
import { useGlobalStore } from '@/store';
import { IDetailConversation } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface ButtonDetailAvatarConversationProps {
  isLoading: boolean;
  conversation: IDetailConversation;
}

const ButtonDetailAvatarConversation: React.FC<ButtonDetailAvatarConversationProps> = ({
  isLoading,
  conversation,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useUploadSingleImage();
  const { t } = useTranslation();
  const { throwError } = useToastError();
  const { mutate: updateConversation } = useUpdateGroupConversation(
    (conversation?._id || conversation?.id)!,
    (data) => {
      queryClient.setQueryData(
        ['conversation', (conversation?._id || conversation?.id)!],
        (prev?: IDetailConversation) => {
          return {
            ...prev!,
            nameGroup: data?.avatarGroup,
          };
        }
      );
    }
  );
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const handleOpenDialogImage = useGlobalStore((state) => state.handleOpenDialogImage);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handSubmit = async () => {
    try {
      setLoadingSubmit(true);
      if (!selectedFile) {
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await mutateAsync(formData);
      updateConversation({
        avatarGroup: res.url,
      });
    } catch (error) {
      throwError(error);
    } finally {
      setLoadingSubmit(false);
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (selectedFile) {
      setOpen(true);
    }
  }, [selectedFile]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <AvatarConversation
              isLoading={isLoading}
              conversation={conversation!}
              classNameAvatar="h-24 w-24  "
              classNameSkeleton="h-10 w-10"
              classNameWrap="relative group"
            >
              <div className="absolute hidden group-hover:flex items-center justify-center inset-0 cursor-pointer rounded-full backdrop-blur-md">
                <Icons.pencil className="w-[30px] h-[30px ]" />
              </div>
            </AvatarConversation>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit " translate="yes" placeholder="bottom-right">
          <div className="relative  p-1 text-base hover:bg-accent rounded-sm mb-1">
            Edit Avatar
            <input
              type="file"
              className="absolute inset-0 opacity-0  z-10"
              onSubmit={(e) => console.log(e)}
              onChange={handleFileChange}
            />
          </div>
          <Separator />
          <div
            onClick={() =>
              conversation?.avatarGroup && handleOpenDialogImage(conversation.avatarGroup)
            }
            className="p-1  text-base hover:bg-accent cursor-pointer rounded-sm mt-1 "
          >
            View Avatar
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('conversation.group.changeGroupAvatar')}</DialogTitle>
            <DialogDescription>
              {t('conversation.group.confirmChangeGroupAvatar')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 items-center justify-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={conversation.avatarGroup} />
              <AvatarFallback>{conversation.nameGroup?.[0]}</AvatarFallback>
            </Avatar>
            <Icons.chevronsRight className="h-8 w-8" />
            <Avatar className="h-16 w-16">
              {selectedFile && <AvatarImage src={URL.createObjectURL(selectedFile!)} />}
            </Avatar>
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <Button
              size={'sm'}
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                setSelectedFile(null);
              }}
              disabled={loadingSubmit}
            >
              {t('setting.close')}
            </Button>

            <Button size={'sm'} disabled={loadingSubmit} onClick={handSubmit}>
              {t('setting.submit')}
              {loadingSubmit && <LoadingComponent className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ButtonDetailAvatarConversation;
