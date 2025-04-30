import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '../../../data/hooks';
import { logout } from '../../../data/authSlice';
import { useNavigate } from 'react-router-dom';
export default function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
  };

  return (
    <button onClick={() => handleLogout()}>
      <LogoutIcon />
    </button>
  );
}
