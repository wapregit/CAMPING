import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { upsertProfile } from '@/api/profile';
import FormButtons from '@/components/form/FormButtons';
import FormInputs from '@/components/form/FormInputs';
import LottiePlayer from '@/components/ui/lottiePlayer';
import { showToast } from '@/components/ui/toastTemplate';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { profileSchema } from '@/utils/schemas';

type Inputs = {
  firstName: string;
  lastName: string;
};

const Profile = () => {
  const { token, profile, isAuthChecked } = useAuthGuard();
  const [profileAction, setProfileAction] = useState<'create' | 'update'>('create');
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({ resolver: zodResolver(profileSchema) });

  const formSubmit: SubmitHandler<Inputs> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = await upsertProfile(token || '', data);

      const { action, message } = res?.data;
      setProfileAction('update');
      showToast('success', `${action === 'create' ? '🆕' : '✏️'} ${message}`);

      reset({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    } catch (error: any) {
      console.log(error);
      const message = error?.res?.data?.message || error.message || 'Something went wrong!';
      showToast('error', message);
    }
  };

  // โหลดข้อมูล profile ตอนเปิดหน้า
  useEffect(() => {
    if (!isAuthChecked) return; 

    const fetchProfile = async () => {
      const start = Date.now();
      try {
        if (profile) {
          reset({ firstName: profile.firstName, lastName: profile.lastName });
          setProfileAction('update');
        } else {
          setProfileAction('create');
        }
      } catch (error) {
        console.log('No profile found, creating new profile...');
        console.log(error);
      } finally {
        const elapsed = Date.now() - start;
        const MIN_LOADING_TIME = 2000;

        if (elapsed < MIN_LOADING_TIME) {
          const waitTime = MIN_LOADING_TIME - elapsed;
          setTimeout(() => {
            setLoading(false);
          }, waitTime);
        } else {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [isAuthChecked, profile, reset]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LottiePlayer src="https://lottie.host/e39f8bc5-e068-4cfd-94f3-b4b1505ab7fb/61TIdTW86N.lottie" />
      </div>
    );
  }

  return (
    <section className="py-8">
      <div>
        <h1 className="mb-4 text-2xl font-semibold capitalize">
          {profileAction === 'create' ? 'Create Profile' : 'Update Profile'}
        </h1>
      </div>

      <div className="rounded-md border p-8">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInputs<Inputs> label="Firstname" name="firstName" type="text" register={register} errors={errors} />
            <FormInputs<Inputs> label="Lastname" name="lastName" type="text" register={register} errors={errors} />
          </div>

          <div className="mt-4 flex items-center justify-end">
            <FormButtons
              text={profileAction === 'create' ? 'Create Profile' : 'Update Profile'}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
