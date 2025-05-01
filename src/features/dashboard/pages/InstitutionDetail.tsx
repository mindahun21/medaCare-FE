import { useParams } from 'react-router-dom';
import { useInstitutions } from '../hooks/dashboardHooks';
import PageLoader from '../../../ui/shared/PageLoader';

export default function InstitutionDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: institutions, isLoading, isError } = useInstitutions();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div>Error loading institution details.</div>;
  }

  const institution = institutions?.find((inst) => inst.id === Number(id));

  if (!institution) {
    return <div>Institution not found.</div>;
  }

  return (
    <div>
      <h1>{institution.name}</h1>
      <p>Type: {institution.type}</p>
      <p>Country: {institution.country}</p>
      <p>Region/State: {institution.regionOrState}</p>
      <p>Rating: {institution.rating}</p>
      <p>Status: {institution.requestStatus}</p>
    </div>
  );
}
