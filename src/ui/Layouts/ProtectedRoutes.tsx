import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectUserRole,
} from '../../features/authentication/AuthSelectors';
import { RootState } from '../../data/store';
import { useAppDispatch } from '../../data/hooks';
import { logout } from '../../data/authSlice';

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  const { expiresAt } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
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

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role!)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
}
