import { useEffect } from 'react';

import { useUser } from '@clerk/clerk-react';

import { showToast } from './ui/toastTemplate';

export const LoginNotify = () => {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const hasLoggedIn = localStorage.getItem('hasLoggedIn');

    if (isSignedIn && !hasLoggedIn) {
      showToast('success', 'Login successfully!');
      localStorage.setItem('hasLoggedIn', 'true');
    }
  }, [isSignedIn, isLoaded]);

  return null;
};

export const LogoutNotify = () => {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const hasLoggedIn = localStorage.getItem('hasLoggedIn');

    if (!isSignedIn && hasLoggedIn) {
      showToast('success', 'Logout successfully!');
      localStorage.removeItem('hasLoggedIn');
    }
  }, [isSignedIn, isLoaded]);

  return null;
};
