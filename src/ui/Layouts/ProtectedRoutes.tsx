import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/authentication/AuthSelectors';
import { RootState } from '../../data/store';
import { useAppDispatch } from '../../data/hooks';
import { fetchUser, logout } from '../../data/authSlice';
import { CircularProgress } from '@mui/material';

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const dispatch = useAppDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { user, expiresAt, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const parsed = auth ? JSON.parse(auth) : null;

    if (parsed?.token && !user) {
      dispatch(fetchUser()).finally(() => setHasCheckedAuth(true));
    } else {
      setHasCheckedAuth(true);
    }
  }, [dispatch, user]);

  useEffect(() => {
    const now = Date.now();
    if (expiresAt && expiresAt < now) {
      dispatch(logout());
    } else if (expiresAt) {
      const timeout = expiresAt - now;
      const timer = setTimeout(() => dispatch(logout()), timeout);
      return () => clearTimeout(timer);
    }
  }, [expiresAt, dispatch]);

  if (!hasCheckedAuth || loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#DEF1FF] to-[#FFF]">
        <CircularProgress size={50} />
      </div>
    );
  }
  const role = user?.role.name;

  if (!user || !isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role!)) return <Navigate to="/unauthorized" />;
  if (user?.firstLogin && role == 'PHYSICIAN')
    return <Navigate to="/profile/complete" />;
  return <Outlet />;
}
