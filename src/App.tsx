import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Guest from './pages/Guest';
import { useDispatch, useSelector } from 'react-redux';
import VerifyEmail from './pages/VerifyEmail';
import ProtectedRoutes from './ui/Layouts/ProtectedRoutes';
import { MessageProvider } from './contexts/MessageContext';
import GlobalMessage from './ui/GlobalMessage';
import CompletePhysicianProfile from './pages/CompletePhysicianProfile';
import InstitutionRequest from './pages/InstitutionRequest';
import ChooseAccountType from './pages/ChooseAccountType';
import AccountVerified from './pages/AccountVerified';
import ApplicationSubmited from './features/authentication/components/ApplicationSubmited';
import PatientRedirectPage from './pages/PatientRedirectPage';
import { useEffect } from 'react';
import { initializeAuth } from './data/authSlice';
import { AppDispatch } from './data/store';
import Dashboard from './features/dashboard/pages/Dashboard';
import DashboardLayout from './ui/Layouts/DashboardLayout';
import Physicians from './features/dashboard/pages/Physicians';
import Institutions from './features/dashboard/pages/Institutions';
import Patients from './features/dashboard/pages/Patients';
import PhysicianDetail from './features/dashboard/pages/PhysicianDetail';
import InstitutionDetail from './features/dashboard/pages/InstitutionDetail';
import axios from 'axios';
import PublicRoute from './ui/Layouts/PublicRoutes';
import PatientsDetail from './features/dashboard/pages/PatientsDetail';
import Schedules from './features/dashboard/pages/Schedules';
import Appointments from './features/dashboard/pages/Appointments';
import PatientAppointmentDetail from './features/dashboard/pages/PatientAppointmentDetail';
import Role from './ui/shared/Role';
import ConsultationChat from './ui/shared/ConsultationChat';
import { selectUser } from './features/authentication/AuthSelectors';
import PasswordReset from './pages/PasswordReset';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [{ index: true, element: <Guest /> }],
  },
  {
    path: 'home',
    element: (
      <ProtectedRoutes allowedRoles={['PHYSICIAN', 'ADMIN', 'ORG_ADMIN']} />
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          {
            element: <ProtectedRoutes allowedRoles={['ADMIN', 'ORG_ADMIN']} />,
            children: [
              { path: 'patients', element: <Patients /> },
              { path: 'patients/detail/:id', element: <PatientsDetail /> },
              { path: 'physicians', element: <Physicians /> },
              { path: 'physicians/detail/:id', element: <PhysicianDetail /> },
            ],
          },
          {
            element: <ProtectedRoutes allowedRoles={['ADMIN']} />,
            children: [
              { path: 'institutions', element: <Institutions /> },
              {
                path: 'institutions/detail/:id',
                element: <InstitutionDetail />,
              },
            ],
          },
          {
            element: <ProtectedRoutes allowedRoles={['PHYSICIAN']} />,
            children: [
              { path: 'schedules', element: <Schedules /> },
              { path: 'appointments', element: <Appointments /> },
              {
                path: 'appointments/detail/:id',
                element: <PatientAppointmentDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: 'password/reset', element: <PasswordReset /> },
  {
    element: <ProtectedRoutes allowedRoles={['PHYSICIAN']} />,
    children: [
      { path: 'profile/complete', element: <CompletePhysicianProfile /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: 'account/verified', element: <AccountVerified /> },
  { path: 'choose-accounttype', element: <ChooseAccountType /> },
  { path: 'institution-request', element: <InstitutionRequest /> },
  {
    path: 'application-submitted',
    element: <ApplicationSubmited />,
  },
  { path: 'verify-email', element: <VerifyEmail /> },
  { path: 'patient/redirect', element: <PatientRedirectPage /> },

  { path: '*', element: <NotFound /> },
]);

function App() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    const keepServerAlive = async () => {
      try {
        await axios.get('https://medacare-be.onrender.com/api/hello');
      } catch {}
    };

    keepServerAlive();

    const intervalId = setInterval(keepServerAlive, 14 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <RouterProvider router={router} />
        <GlobalMessage />
        <Role allowedRoles={['PHYSICIAN']} fallback={null}>
          {() => user && user.firstLogin === false && <ConsultationChat />}
        </Role>
      </MessageProvider>
    </QueryClientProvider>
  );
}

export default App;
