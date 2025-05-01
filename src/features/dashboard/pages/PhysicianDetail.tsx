import React from 'react';
import { useParams } from 'react-router-dom';
import { useAdminPhysicians } from '../hooks/dashboardHooks';
import PageLoader from '../../../ui/shared/PageLoader';

export default function PhysicianDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: physicians, isLoading, isError } = useAdminPhysicians();
  console.log(physicians);
  console.log(id);
  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div>Error loading physician details.</div>;
  }
  const physician = physicians?.find((p) => p.id === Number(id));
  console.log(physicians);
  if (!physician) {
    return <div>Physician not found.</div>;
  }

  return (
    <div>
      <h1>
        {physician.firstName} {physician.lastName}
      </h1>
      <p>Email: {physician.email}</p>
      <p>Specialization: {physician.specialization}</p>
      <p>Experience: {physician.experience} years</p>
      <p>Age: {physician.age}</p>
      <p>Status: {physician.accountRequestStatus}</p>
    </div>
  );
}
