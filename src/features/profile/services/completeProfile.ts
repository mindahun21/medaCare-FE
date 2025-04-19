import apiClient from '../../../services/apiClient';
import { CompletePhysicianProfileType } from '../completeProfileSchema';

const createFormData = (data: CompletePhysicianProfileType) => {
  const formData = new FormData();
  formData.append('phoneNumber', data.phoneNumber);
  formData.append('gender', data.gender);
  formData.append('dateOfBirth', data.dateOfBirth);
  formData.append('nationalId', data.nationalId);
  formData.append('resume', data.resume);
  formData.append('medicalLicense', data.medicalLicense);
  formData.append('specialization', data.specialization);
  formData.append('degreeCertificate', data.degreeCertificate);
  return formData;
};

export const submitPhysicianProfile = async (
  data: CompletePhysicianProfileType
) => {
  const formData = createFormData(data);
  return apiClient.post('/physician/profile/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
