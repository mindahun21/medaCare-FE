import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../data/hooks'; // or wherever you define it
import { requestUser } from '../services/user';

export const useUser = () => {
  const token = useAppSelector((state) => state.auth.token);
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: requestUser,
    enabled: !!token,
  });
};
