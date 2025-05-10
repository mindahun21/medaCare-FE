import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../data/store';
import PageLoader from '../shared/PageLoader';
import { useEffect, useRef } from 'react';
import { useMessage } from '../../contexts/MessageContext';
import { selectIsAuthenticated } from '../../features/authentication/AuthSelectors';
import { isPhysicianEntity } from '../../types/user';

export default function ProtectedRoutes({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const { token, user, loading, authInitialized } = useSelector(
    (state: RootState) => state.auth
  );
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { showMessage } = useMessage();
  const location = useLocation();
  const hasShownMessage = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !authInitialized) return;

    if (!token || !isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    if (user) {
      const role = user.role?.name;
      const verified = user.verified;

      if (
        role === 'PHYSICIAN' &&
        user?.entity &&
        isPhysicianEntity(user?.entity)
      ) {
        const status = user.entity?.accountRequestStatus;
        if (user.firstLogin) {
          navigate('/profile/complete', { replace: true });
          return;
        }
        const isGuestPath = location.pathname === '/';

        if (status === 'PENDING' && !isGuestPath && !hasShownMessage.current) {
          showMessage({
            type: 'info',
            text: 'Your account request has been submitted and is pending approval.',
          });
          hasShownMessage.current = true;
          navigate('/', { replace: true });
          return;
        }

        if (status === 'REJECTED' && !isGuestPath && !hasShownMessage.current) {
          showMessage({
            type: 'warning',
            text: 'Your account has been rejected.',
          });
          hasShownMessage.current = true;
          navigate('/', { replace: true });
          return;
        }
      }

      if (role === 'PHYSICIAN' && verified === false) {
        navigate('/verify-email', { replace: true });
        return;
      }

      if (role === 'ORG_ADMIN' && verified === false) {
        navigate('/application-submitted', { replace: true });
        return;
      }

      if (role === 'PATIENT') {
        navigate('/patient/redirect', { replace: true });
        return;
      }

      if (!allowedRoles.includes(role)) {
        navigate('/unauthorized', { replace: true });
        return;
      }
    }
  }, [
    token,
    user,
    isAuthenticated,
    loading,
    allowedRoles,
    showMessage,
    location.pathname,
    navigate,
    authInitialized,
  ]);

  if (!authInitialized || loading || (token && !user)) {
    return <PageLoader />;
  }

  return <Outlet />;
}
