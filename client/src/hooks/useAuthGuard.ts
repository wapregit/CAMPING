import { useEffect, useState } from 'react';

import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '@/api/profile';

type ProfileType = {
  id: string;
  firstName: string;
  lastName: string;
};

export const useAuthGuard = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    const checkProfile = async () => {
      if (!isLoaded) return;

      if (!isSignedIn || !user?.id) {
        navigate('/');
        return;
      }

      try {
        const token = await getToken();
        setToken(token);

        const res = await getProfile(token || '');
        setProfile(res?.data?.result ?? null);
      } catch (error) {
        console.error('getProfile failed', error);
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkProfile();
  }, [isLoaded, isSignedIn, user, navigate, getToken]);

  return { isAuthChecked, token, profile };
};
