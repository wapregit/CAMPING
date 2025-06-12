import { RouterProvider } from 'react-router';

import { Toaster } from '@/components/ui/sonner';
import AppRoutes from '@/routes/AppRoutes';

import { LoginNotify, LogoutNotify } from './components/Notify';

const App = () => {
  return (
    <>
      <RouterProvider router={AppRoutes} />
      <Toaster richColors />
      <LoginNotify />
      <LogoutNotify />
    </>
  );
};

export default App;
