import { useConversationStore } from '@/store';
import React from 'react';
import { useDropzone } from 'react-dropzone';

export const useUploadFile = () => {
  const { addFile, fileUpload } = useConversationStore((state) => state);
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      addFile(acceptedFiles);
    },
    [addFile]
  );
  return useDropzone({
    onDrop,
    maxFiles: 10,
    validator: (file) => {
      const isDuplicate = fileUpload.some((existingFile) => {
        return file.name === existingFile.name;
      });

      if (isDuplicate) {
        return {
          code: 'file duplicated',
          message: `file duplicated`,
        };
      }

      if (fileUpload?.length > 9) {
        return {
          code: 'max file 10',
          message: `max file 10`,
        };
      }

      return null;
    },
  });
};
