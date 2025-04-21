import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Guest from './pages/Guest';
import { Provider } from 'react-redux';
import { store } from './data/store';
import VerifyEmail from './pages/VerifyEmail';
import ProtectedRoutes from './ui/Layouts/ProtectedRoutes';
import Unauthorized from './pages/Unauthorized';
import { MessageProvider } from './contexts/MessageContext';
import GlobalMessage from './ui/GlobalMessage';
import CompletePhysicianProfile from './pages/CompletePhysicianProfile';
import InstitutionRequest from './pages/InstitutionRequest';
import ChooseAccountType from './pages/ChooseAccountType';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', index: true, element: <Guest /> },
  {
    element: (
      <ProtectedRoutes
        allowedRoles={['PHYSICIAN', 'ADMIN', 'SUPER_ADMIN', 'ORG_ADMIN']}
      />
    ),
    children: [{ path: 'home', element: <Home /> }],
  },
  { path: 'profile/complete', element: <CompletePhysicianProfile /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: 'choose-accounttype', element: <ChooseAccountType /> },
  { path: 'institution-request', element: <InstitutionRequest /> },
  { path: 'verify-email', element: <VerifyEmail /> },
  { path: 'unauthorized', element: <Unauthorized /> },

  { path: '*', element: <NotFound /> },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MessageProvider>
          <RouterProvider router={router} />
          <GlobalMessage />
        </MessageProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
