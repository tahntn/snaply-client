import LoadingComponent from '../LoadingComponent';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent } from '../ui/dialog';
import { useGlobalStore } from '@/store';

const DialogPreviewImage = () => {
  const { previewImage, handleCloseDialogImage } = useGlobalStore((state) => state);
  return (
    <Dialog open={previewImage.isOpen} onOpenChange={handleCloseDialogImage}>
      <DialogContent className="sm:max-w-md lg:min-w-[1000px] md:min-h-[700px] flex items-center justify-center ">
        <div className="flex items-center justify-center  p-5 m-5 w-full  max-h-[calc(100vh-200px)] ">
          <Avatar
            className={
              ' shadow-lg max-w-full min-w-[400px] h-full rounded-none max-h-[calc(100vh-200px)] '
            }
          >
            <AvatarImage src={previewImage.urlImage} className="aspect-auto object-cover" />
            <AvatarFallback className="h-full w-fit flex items-center justify-center">
              <LoadingComponent />
            </AvatarFallback>
          </Avatar>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPreviewImage;
