import React from 'react';
import { CompletePhysicianProfileType } from '../../completeProfileSchema';
import FileUploadInput from '../../../../ui/shared/inputFields/FileUploadInput';

export default function CompleteProfileFormTwo() {
  return (
    <div className="w-full space-y-5 md:space-y-10">
      <h1 className="text-primary-teal text-2xl">Personal Documents</h1>

      <FileUploadInput<CompletePhysicianProfileType>
        name="nationalId"
        label="Upload National Id"
        accept={{
          'application/pdf': ['.pdf'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            ['.docx'],
          'application/msword': ['.doc'],
        }}
        maxSize={25 * 1024 * 1024} // 25MB
        description="Please upload files in pdf, docx or doc format and make sure the file size is under 25 MB."
      />
      <FileUploadInput<CompletePhysicianProfileType>
        name="resume"
        label="Upload Resume"
        accept={{
          'application/pdf': ['.pdf'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            ['.docx'],
          'application/msword': ['.doc'],
        }}
        maxSize={25 * 1024 * 1024} // 25MB
        description="Please upload files in pdf, docx or doc format and make sure the file size is under 25 MB."
      />
    </div>
  );
}
