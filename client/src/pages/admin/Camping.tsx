import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createCamping } from '@/api/camping';
import FormButtons from '@/components/form/FormButtons';
import FormCategory from '@/components/form/FormCategory';
import FormInputs from '@/components/form/FormInputs';
import FormTextarea from '@/components/form/FormTextarea';
import FormUploadImage from '@/components/form/FormUploadImage';
import Map from '@/components/map/Map';
import { showToast } from '@/components/ui/toastTemplate';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { DEFAULT_LOCATION, TEXT_AREA_MAX_LENGTH } from '@/utils/constants';
import { campingSchema } from '@/utils/schemas';

type Inputs = {
  title: string;
  price: number;
  description: string;
  category: string;
  lat: number;
  lng: number;
  image: string;
};

const Camping = () => {
  const { token, isAuthChecked, profile } = useAuthGuard();
  const navigate = useNavigate();
  const [mapResetKey, setMapResetKey] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<Inputs>({ resolver: zodResolver(campingSchema) });

  const formSubmit: SubmitHandler<Inputs> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const res = await createCamping(token || '', data);

      const { action, message } = res?.data;
      showToast('success', `${action === 'create' ? '🆕' : '✏️'} ${message}`);

      reset();
      setMapResetKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      const message = error?.res?.data?.message || error.message || 'Something went wrong!';
      showToast('error', message);
    }
  };

  useEffect(() => {
    if (isAuthChecked && !profile) {
      navigate('/user/Profile');
    }
  }, [isAuthChecked, profile, navigate]);

  if (!isAuthChecked || !profile) return null;

  return (
    <section className="py-8">
      <div>
        <h1 className="mb-4 text-2xl font-semibold capitalize">Create Camping</h1>
      </div>

      <div className="rounded-md border p-8">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInputs<Inputs>
              label="Title"
              name="title"
              type="text"
              register={register}
              errors={errors}
              placeholder="Please Enter Title"
            />
            <FormInputs<Inputs>
              label="Price"
              name="price"
              type="number"
              register={register}
              errors={errors}
              placeholder="Please Enter Price"
            />

            <FormTextarea<Inputs>
              label="Description"
              name="description"
              register={register}
              errors={errors}
              watch={watch}
              maxLength={TEXT_AREA_MAX_LENGTH}
              placeholder="Please Enter Description"
            />

            <div className="flex flex-col gap-1">
              <FormCategory
                label="Category"
                name="category"
                setValue={setValue}
                register={register}
                control={control}
                errors={errors}
              />

              <FormUploadImage<Inputs> label="Upload Image" setValue={setValue} errors={errors} />
            </div>
          </div>

          <Map register={register} setValue={setValue} location={DEFAULT_LOCATION} resetTrigger={mapResetKey} />

          <div className="mt-4 flex items-center justify-end">
            <FormButtons text="create camping" isSubmitting={isSubmitting} />
          </div>
        </form>
      </div>
    </section>
  );
};
export default Camping;
