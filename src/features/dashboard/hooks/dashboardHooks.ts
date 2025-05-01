import { useQuery } from '@tanstack/react-query';
import {
  fetchAdminPhysicians,
  fetchInstitutions,
} from '../services/dashboardService';
import { Institution, Physician } from '../types';

export const useAdminPhysicians = () => {
  return useQuery<Physician[], Error>({
    queryKey: ['adminPhysicians'],
    queryFn: fetchAdminPhysicians,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export const useInstitutions = () => {
  return useQuery<Institution[], Error>({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};
