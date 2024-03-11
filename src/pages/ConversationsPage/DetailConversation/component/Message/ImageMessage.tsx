import LoadingComponent from '@/components/LoadingComponent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store';
import { Text } from '@radix-ui/themes';
import React from 'react';

interface ImageMessageProps {
  imageList: string[];
  classNameWrap?: string;
  classNameWrapImage?: string;
  classNameImg?: string;
  isShowText?: boolean;
}

const ImageMessage: React.FC<ImageMessageProps> = ({
  imageList,
  classNameWrap,
  classNameWrapImage,
  classNameImg,
  isShowText = true,
}) => {
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
              widthItem === 3 && 'max-w-[calc(calc(100%/1)-0px)]',
              classNameWrapImage
            )}
          >
            <Avatar
              className={cn(
                ' shadow-lg w-full h-full rounded-none transition-transform transform group-hover/image:scale-105',
                classNameImg
              )}
            >
              <AvatarImage src={image} className="aspect-auto object-cover" />
              <AvatarFallback className="h-full w-fit flex items-center justify-center">
                <LoadingComponent />
              </AvatarFallback>
            </Avatar>

            <div
              className={cn(
                'hidden absolute cursor-pointer group-hover/image:block inset-0 bg-black bg-opacity-50 opacity-0 group-hover/image:opacity-100 transition-opacity',
                'group-hover/image:flex group-hover/image:items-center group-hover/image:justify-center'
              )}
              onClick={() => {
                handleOpenDialogImage(image);
              }}
            >
              <Button className="bg-transparent text-white text-xs">
                <Icons.eye className="mr-2" />
                {isShowText && <Text className="md:hidden lg:block">Preview image</Text>}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ImageMessage);
