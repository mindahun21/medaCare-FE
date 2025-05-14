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
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
      return;
    }

    if (user) {
      const role = user.role?.name;
      const verified = user.verified;

      if (user?.passwordResetRequired) {
        if (location.pathname !== '/password/reset') {
          navigate('/password/reset', { replace: true });
          showMessage({
            type: 'info',
            text: 'You need to reset your password!',
          });
        }
        return;
      }

      if (
        role === 'PHYSICIAN' &&
        user?.entity &&
        isPhysicianEntity(user?.entity)
      ) {
        const status = user.entity?.accountRequestStatus;
        const isGuestPath = location.pathname === '/';

        if (user.firstLogin) {
          if (location.pathname !== '/profile/complete') {
            navigate('/profile/complete', { replace: true });
          }
          return;
        }

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
        if (location.pathname !== '/verify-email') {
          navigate('/verify-email', { replace: true });
        }
        return;
      }

      if (role === 'ORG_ADMIN' && verified === false) {
        if (location.pathname !== '/application-submitted') {
          navigate('/application-submitted', { replace: true });
        }
        return;
      }

      if (role === 'PATIENT') {
        if (location.pathname !== '/patient/redirect') {
          navigate('/patient/redirect', { replace: true });
        }
        return;
      }

      if (!allowedRoles.includes(role)) {
        if (location.pathname !== '/unauthorized') {
          navigate('/unauthorized', { replace: true });
        }
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
