import apiClient from '../../../services/apiClient';
import { Institution, Physician } from '../types';

export const fetchAdminPhysicians = async (): Promise<Physician[]> => {
  try {
    const response = await apiClient.get('physicians');
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchInstitutions = async (): Promise<Institution[]> => {
  try {
    const response = await apiClient.get('institutions');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const requestAcceptPhysician = async ({
  status,
  id,
}: {
  status: string;
  id: number;
}) => {
  try {
    const response = await apiClient.put(`physicians/requests/${id}/${status}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const requestAcceptInstitution = async ({
  status,
  id,
}: {
  status: string;
  id: number;
}) => {
  try {
    const response = await apiClient.put(
      `institutions/requests/${id}/${status}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
