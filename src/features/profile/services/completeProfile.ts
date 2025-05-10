import apiClient from '../../../services/apiClient';

export const submitPhysicianProfile = async (data: FormData) => {
  return apiClient.post('/physicians', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
