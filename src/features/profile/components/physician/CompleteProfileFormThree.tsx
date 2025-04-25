import React from 'react';
import FileUploadInput from '../../../../ui/shared/inputFields/FileUploadInput';
import { CompletePhysicianProfileType } from '../../completeProfileSchema';

export default function CompleteProfileFormThree() {
  return (
    <div className="w-full space-y-5 md:space-y-10">
      <h1 className="text-primary-teal text-2xl">Personal Documents</h1>
      <FileUploadInput<CompletePhysicianProfileType>
        name="medicalLicense"
        label="Upload Medical Lisence Document"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={25 * 1024 * 1024} // 25MB
        description="Please upload files in pdf format and make sure the file size is under 25 MB."
      />
      <FileUploadInput<CompletePhysicianProfileType>
        name="specialization"
        label="Upload Specializations"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={25 * 1024 * 1024} // 25MB
        description="Please upload files in pdf format and make sure the file size is under 25 MB."
      />
      <FileUploadInput<CompletePhysicianProfileType>
        name="degreeCertificate"
        label="Upload Degree Certificate"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={25 * 1024 * 1024} // 25MB
        description="Please upload files in pdf format and make sure the file size is under 25 MB."
      />
    </div>
  );
}
