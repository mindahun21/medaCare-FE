import apiClient from '../../../services/apiClient';
import { LoginFormData, RegisterFormData } from '../types';

export async function registerUser(formData: RegisterFormData) {
  const response = await apiClient.post('/api/register', formData);

  return response.data;
}

export async function loginUser(formData: LoginFormData) {
  const response = await apiClient.post('/api/login', formData);

  return response.data;
}
