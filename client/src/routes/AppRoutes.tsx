import { createBrowserRouter, Navigate } from 'react-router';

import LayoutAdmin from '@/layouts/LayoutAdmin';
import LayoutUser from '@/layouts/LayoutUser';
import About from '@/pages/About';
import Camping from '@/pages/admin/Camping';
import Dashboard from '@/pages/admin/Dashboard';
import Manage from '@/pages/admin/Manage';
import Home from '@/pages/Home';
import Notfound from '@/pages/Notfound';
import Profile from '@/pages/user/Profile';

const AppRoutes = createBrowserRouter([
  /* Public */
  {
    path: '/',
    Component: LayoutUser,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
    ],
  },

  /* Private User*/
  {
    path: '/user',
    Component: LayoutUser,
    children: [{ path: 'profile', Component: Profile }],
  },

  /* Private Admin*/
  {
    path: '/admin',
    Component: LayoutAdmin,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: 'dashboard', Component: Dashboard },
      { path: 'manage', Component: Manage },
      { path: 'camping', Component: Camping },
    ],
  },

  /* 404 fallback */
  {
    path: '*',
    Component: LayoutUser,
    children: [{ path: '*', Component: Notfound }],
  },
]);

export default AppRoutes;
