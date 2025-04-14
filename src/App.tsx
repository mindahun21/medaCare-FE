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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', index: true, element: <Guest /> },
  { path: 'home', index: true, element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: 'verify-email', element: <VerifyEmail /> },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />;
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
