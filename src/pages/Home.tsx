import { useSelector } from 'react-redux';
import { RootState } from '../data/store';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  if (user?.firstLogin) {
    navigate('/profile/complete');
  }
  return <div className="text-9xl text-green-900">home page</div>;
}
