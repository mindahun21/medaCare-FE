import { useSelector } from 'react-redux';
import { selectUserRole } from '../../features/authentication/AuthSelectors';
import React from 'react';

export default function Role({
  allowedRoles,
  children,
  fallback = null,
}: {
  allowedRoles: string[];
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  const role = useSelector(selectUserRole);
  if (allowedRoles.includes(role || '')) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
}
