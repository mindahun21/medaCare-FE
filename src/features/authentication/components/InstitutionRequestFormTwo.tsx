import React from 'react';
import FileUploadInput from '../../../ui/shared/inputFields/FileUploadInput';
import { InstitutionRequestSchemaType } from '../InstitutionRequestSchema';

export default function InstitutionRequestFormTwo() {
  return (
    <div className="w-full space-y-5 md:space-y-10">
      <h1 className="text-primary-teal text-2xl">Legal Documents</h1>
      <FileUploadInput<InstitutionRequestSchemaType>
        name="businessDocument"
        label="Upload business document"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={25 * 1024 * 1024} // 25MB
        description="Please upload files in pdf format and make sure the file size is under 25 MB."
      />
      <FileUploadInput<InstitutionRequestSchemaType>
        name="medicalLicense"
        label="Upload medical license"
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSize={25 * 1024 * 1024} // 25MB
        description="Please upload files in pdf format and make sure the file size is under 25 MB."
      />
    </div>
  );
}
