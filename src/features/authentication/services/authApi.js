import apiClient from '../../../services/apiClient';

export async function registerUser(formData) {
  const response = await apiClient.post('/api/register', formData);

  return response.data;
}

export async function loginUser(formData) {
  const response = await apiClient.post('/api/login', formData);

  return response.data;
}
