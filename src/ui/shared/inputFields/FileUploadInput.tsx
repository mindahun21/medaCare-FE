import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import {
  useFormContext,
  FieldValues,
  Path,
  PathValue,
  FieldError,
  useWatch,
} from 'react-hook-form';
import { FormHelperText } from '@mui/material';

type FileUploadInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  accept: { [key: string]: string[] };
  description?: string;
  maxSize: number;
  required?: boolean;
};

function FileUploadInput<T extends FieldValues>({
  name,
  label,
  description,
  accept,
  maxSize,
  required = true,
}: FileUploadInputProps<T>) {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<T>();

  const onDrop = (acceptedFiles: File[]) => {
    setValue(name, acceptedFiles[0] as PathValue<T, Path<T>>);
  };

  const file = useWatch({ name });
  const fileName = file?.name;

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxSize,
    onDrop,
  });

  const fieldError = errors[name] as FieldError | undefined;

  return (
    <div className="flex flex-col p-5 border rounded-xl border-gray-200 shadow-md">
      <div className="flex justify-start">
        <p className="text-[14px] leading-[21px] text-[#181D27] font-bold relative ">
          {label}
          {required && (
            <span className="text-red-600 absolute -top-1 -right-4 text-xl ">
              *
            </span>
          )}
        </p>
      </div>
      {description && (
        <p className="text-[10px] leading-[15px] text-[#6C606C] ">
          {description}
        </p>
      )}

      {fileName && (
        <FileIcon
          onRemove={() => {
            setValue(name, null as PathValue<T, Path<T>>);
            clearErrors(name);
          }}
          filename={fileName}
        />
      )}

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-300 bg-blue-100 p-2 rounded-md mt-4 flex flex-col items-center  cursor-pointer"
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

      {fieldError && (
        <FormHelperText error>{fieldError.message}</FormHelperText>
      )}
    </div>
  );
}

function FileIcon({
  filename,
  onRemove,
}: {
  filename: string;
  onRemove: () => void;
}) {
  return (
    <div className="w-full flex justify-start pt-[24px] ">
      <div className="flex flex-col items-center gap-[5px] border-[0.7px] border-[#FCEDFD] relative p-[4.6px]">
        <InsertDriveFileIcon sx={{ width: 21, height: 28, color: '#1D586E' }} />
        <span className="font-normal text-[10px] leading-[15px] ">
          {filename.length > 10
            ? `${filename.slice(0, 6)}..${filename.slice(-4)}`
            : filename}
        </span>
        <button
          className="h-[16px] w-[16px] rounded-full flex justify-center items-center absolute  bg-[#44084A] -top-1 -right-1"
          type="button"
          onClick={() => {
            onRemove();
          }}
        >
          <CloseIcon sx={{ color: 'white', width: 13, height: 13 }} />
        </button>
      </div>
    </div>
  );
}

export default FileUploadInput;
