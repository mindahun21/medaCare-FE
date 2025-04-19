// FileUploadInput.tsx
import React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  useFormContext,
  FieldValues,
  Path,
  PathValue,
  FieldError,
} from 'react-hook-form';
import { FormHelperText } from '@mui/material';

type FileUploadInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  accept: { [key: string]: string[] };
  description?: string;
  maxSize: number;
};

function FileUploadInput<T extends FieldValues>({
  name,
  label,
  description,
  accept,
  maxSize,
}: FileUploadInputProps<T>) {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<T>();

  const onDrop = (acceptedFiles: File[]) => {
    setValue(name, acceptedFiles[0] as PathValue<T, Path<T>>);
  };

  const uploadedFile = getValues(name) as File | undefined;
  const fileName = uploadedFile?.name;

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxSize,
    onDrop,
  });

  const fieldError = errors[name] as FieldError | undefined;

  return (
    <div className="flex flex-col gap-2 p-5 border rounded-xl border-gray-200 shadow-md">
      <p className="text-xl font-bold">{label}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-300 bg-blue-100 p-2 rounded-md mt-4 flex flex-col items-center"
      >
        <input {...getInputProps()} />
        <p className="font-bold">
          Drop file or <span className="text-blue-400 ">Browse</span>
        </p>
        <p className="text-center text-gray-500">
          Format: {Object.values(accept).join(', ')} & Max file size:{' '}
          {maxSize / 1024 / 1024} MB
        </p>
      </div>

      {fileName && (
        <p className="mt-2 text-sm text-gray-600 font-bold text-center">
          Uploaded file:{' '}
          <span className="text-blue-400 text-lg">{fileName}</span>
        </p>
      )}

      {fieldError && (
        <FormHelperText error>{fieldError.message}</FormHelperText>
      )}
    </div>
  );
}

export default FileUploadInput;
