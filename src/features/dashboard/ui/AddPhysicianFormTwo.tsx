import React from 'react';
import { AddPhysicianType } from '../schema';
import FileUploadInput from '../../../ui/shared/inputFields/FileUploadInput';

export default function AddPhysicianFormTwo() {
  return (
    <div className="w-full flex flex-col gap-[37px]">
      <h1 className="text-primary-teal text-[20px] leading-[28px]">
        Physician Documents
      </h1>

      <FileUploadInput<AddPhysicianType>
        name="profilePhoto"
        label="Upload Profile Photo"
        accept={{
          'image/jpeg': ['.jpeg'],
          'image/png': ['.png'],
          'image/jpg': ['.jpg'],
        }}
        maxSize={5 * 1024 * 1024} // 5MB
        description="Please upload image files only (jpeg, png, jpg) under 5 MB."
      />

      <FileUploadInput<AddPhysicianType>
        name="nationalId"
        label="Upload National ID"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload PDF files only under 9 MB."
      />

      <FileUploadInput<AddPhysicianType>
        name="resume"
        label="Upload Resume"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload PDF files only under 9 MB."
      />

      <FileUploadInput<AddPhysicianType>
        name="medicalLicense"
        label="Upload Medical License"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload PDF files only under 9 MB."
      />

      <FileUploadInput<AddPhysicianType>
        name="specializationDoc"
        label="Upload Specialization Document"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload PDF files only under 9 MB."
      />

      <FileUploadInput<AddPhysicianType>
        name="degreeCertificate"
        label="Upload Degree Certificate"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={9 * 1024 * 1024} // 9MB
        description="Please upload PDF files only under 9 MB."
      />
    </div>
  );
}
