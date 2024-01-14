import { Dialog, DialogContent } from '../ui/dialog';
import { useGlobalStore } from '@/store';

const DialogPreviewImage = () => {
  const { previewImage, handleCloseDialogImage } = useGlobalStore((state) => state);
  return (
    <Dialog open={previewImage.isOpen} onOpenChange={handleCloseDialogImage}>
      <DialogContent className="sm:max-w-md lg:min-w-[1000px] md:min-h-[700px] flex items-center justify-center ">
        <div className="flex items-center justify-center  p-5 w-full">
          <img src={previewImage.urlImage} className="border md:w-[60%]" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPreviewImage;
