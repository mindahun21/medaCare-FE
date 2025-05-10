import React from 'react';
import { CompletePhysicianProfileType } from '../../completeProfileSchema';
import FileUploadInput from '../../../../ui/shared/inputFields/FileUploadInput';

export default function CompleteProfileFormTwo() {
  return (
    <div className="w-full flex flex-col gap-[37px]">
      <h1 className="text-primary-teal text-[20px] leading-[28px]">
        Personal Documents
      </h1>

      <FileUploadInput<CompletePhysicianProfileType>
        name="nationalId"
        label="Upload National Id"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload files in pdf format and make sure the file size is under 9 MB."
      />
      <FileUploadInput<CompletePhysicianProfileType>
        name="resume"
        label="Upload Resume"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload files in pdf format and make sure the file size is under 9 MB."
      />
    </div>
  );
}
