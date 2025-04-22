import apiClient from '../../../services/apiClient';
import { CompletePhysicianProfileType } from '../completeProfileSchema';

export const submitPhysicianProfile = async (
  data: Partial<CompletePhysicianProfileType>
) => {
  return apiClient.post('/physician', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
