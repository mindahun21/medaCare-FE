import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
}
