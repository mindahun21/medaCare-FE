import { useSelector } from 'react-redux';
import { selectUserRole } from '../../features/authentication/AuthSelectors';
import React from 'react';

export default function Role({
  allowedRoles,
  fallback = null,
  children,
}: {
  allowedRoles: string[];
  fallback: React.ReactNode;
  children: () => React.ReactNode;
}) {
  const role = useSelector(selectUserRole);
  return allowedRoles.includes(role || '') ? (
    <>{children()}</>
  ) : (
    <>{fallback}</>
  );
}
