import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../data/store';
import PageLoader from '../shared/PageLoader';
import { isPhysicianEntity } from '../../types/user';
import { useMessage } from '../../contexts/MessageContext';

export default function PublicRoute() {
  const { token, user, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  if (loading) return <PageLoader />;

  if (token && user) {
    const role = user.role?.name;
    if (user?.passwordResetRequired) {
      navigate('/password/reset', { replace: true });
      showMessage({
        type: 'info',
        text: 'You need to reset your password!',
      });

      return;
    }
    const status =
      role === 'PHYSICIAN' && user?.entity && isPhysicianEntity(user?.entity)
        ? user.entity.accountRequestStatus
        : null;

    const isVerified = user.verified;
    const isFirstLogin = user.firstLogin;

    const isPendingPhysician = role === 'PHYSICIAN' && status === 'PENDING';

    if (isPendingPhysician) {
      return <Outlet />;
    }

    const isApproved =
      role !== 'PHYSICIAN' ||
      (status === 'APPROVED' && isVerified && !isFirstLogin);

    if (isApproved) {
      if (role === 'PHYSICIAN') {
        return <Navigate to="/home/dashboard" replace />;
      }
      if (role === 'ADMIN' || role === 'ORG_ADMIN')
        return <Navigate to="/home/dashboard" replace />;
      if (role === 'PATIENT')
        return <Navigate to="/patient/redirect" replace />;
    }
  }

  return <Outlet />;
}
