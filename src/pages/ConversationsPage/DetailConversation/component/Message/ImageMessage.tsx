import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store';
import React from 'react';

interface ImageMessageProps {
  imageList: string[];
  classNameWrap: string;
}

const ImageMessage: React.FC<ImageMessageProps> = ({ imageList, classNameWrap }) => {
  const handleOpenDialogImage = useGlobalStore((state) => state.handleOpenDialogImage);
  return (
    <div className={classNameWrap}>
      {imageList.map((image, index) => {
        const total = imageList.length;
        let widthItem = 1;
        if (total % 3 === 1) {
          if (index === total - 1) {
            widthItem = 3;
          }
        } else if (total % 3 === 2) {
          if (index >= total - 2) {
            widthItem = 2;
          }
        }

        return (
          <div
            key={index}
            className={cn(
              'max-h-[300px] border rounded-xl overflow-hidden group/image relative ',
              widthItem === 1 && 'max-w-[calc(calc(100%/3)-3px)]',
              widthItem === 2 && 'w-[calc(calc(100%/2)-2px)]',
              widthItem === 3 && 'max-w-[calc(calc(100%/1)-0px)]'
            )}
          >
            <img
              src={image}
              className={cn(
                ' object-cover  shadow-lg w-full h-full transition-transform transform group-hover/image:scale-105'
              )}
            />
            <div
              className={cn(
                'hidden absolute cursor-pointer group-hover/image:block  inset-0 bg-black bg-opacity-50 opacity-0 group-hover/image:opacity-100 transition-opacity',
                'group-hover/image:flex group-hover/image:items-center group-hover/image:justify-center'
              )}
              onClick={() => {
                handleOpenDialogImage(image);
              }}
            >
              <Button className="bg-transparent text-white ">
                <Icons.eye className="mr-2" /> Preview image
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ImageMessage);
