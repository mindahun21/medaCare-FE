import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Guest from './pages/Guest';
import { useDispatch } from 'react-redux';
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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Guest />,
    index: true,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        element: (
          <ProtectedRoutes allowedRoles={['PHYSICIAN', 'ADMIN', 'ORG_ADMIN']} />
        ),
        children: [{ path: 'dashboard', element: <Dashboard /> }],
      },
      {
        element: <ProtectedRoutes allowedRoles={['ADMIN', 'ORG_ADMIN']} />,
        children: [
          { path: 'physicians', element: <Physicians /> },
          { path: 'physicians/detail/:id', element: <PhysicianDetail /> },
          { path: 'patients', element: <Patients /> },
        ],
      },
      {
        element: <ProtectedRoutes allowedRoles={['ADMIN']} />,
        children: [
          { path: 'institutions', element: <Institutions /> },
          { path: 'institutions/detail/:id', element: <InstitutionDetail /> },
        ],
      },
    ],
  },
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

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return (
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <RouterProvider router={router} />
        <GlobalMessage />
      </MessageProvider>
    </QueryClientProvider>
  );
}

export default App;
