import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectUserRole,
} from '../../features/authentication/AuthSelectors';
import { RootState } from '../../data/store';
import PageLoader from '../shared/PageLoader';
import { useEffect } from 'react';
import Unauthorized from './Unauthorized';

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);
  const { loading, token, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !isAuthenticated) {
      navigate('/login');
    }
    if (isAuthenticated && user?.firstLogin && user.role.name == 'PHYSICIAN') {
      navigate('/profile/complete');
    }
  }, [loading, token, navigate, isAuthenticated, user]);

  if (loading || (token && !isAuthenticated)) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (role == 'PATIENT') return <Navigate to="/patient/redirect" />;

  if (!allowedRoles.includes(role || '')) return <Unauthorized />;

  return <Outlet />;
}
