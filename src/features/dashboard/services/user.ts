import apiClient from '../../../services/apiClient';

export async function requestUser() {
  const response = await apiClient.get('users/current');

  return response;
}
