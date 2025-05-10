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
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload files in pdf format and make sure the file size is under 9 MB."
      />
      <FileUploadInput<CompletePhysicianProfileType>
        name="specializationDoc"
        label="Upload Specialization"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload files in pdf format and make sure the file size is under 9 MB."
      />
      <FileUploadInput<CompletePhysicianProfileType>
        name="degreeCertificate"
        label="Upload Degree Certificate"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload files in pdf format and make sure the file size is under 9 MB."
      />
    </div>
  );
}
