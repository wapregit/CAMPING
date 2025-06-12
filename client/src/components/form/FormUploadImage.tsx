import { useState } from 'react';

import { TriangleAlert } from 'lucide-react';
import { FieldErrors, FieldValues } from 'react-hook-form';

import { uploadImage } from '@/api/uploadfile';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { resizeFile } from '@/utils/resizeimage';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

type uploadProps<T extends FieldValues> = {
  label: string;
  setValue: (name: 'image', value: string) => void;
  errors?: FieldErrors<T>;
};

const FormUploadImage = <T extends FieldValues>({ label, setValue, errors }: uploadProps<T>) => {
  const { token } = useAuthGuard();
  const { isLoading, setIsLoading } = useState(false);
  const errorMessage = errors?.image?.message as string | undefined;

  const hdlOnChange = async (event: any) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    try {
      const resizedImage = await resizeFile(file);
      const res = await uploadImage(token || '', resizedImage);
      setValue('image', res.data.result);
      setIsLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Label className="mb-1 capitalize">{label}</Label>
      <div>
        <Input type="file" onChange={hdlOnChange} />
      </div>
      {errorMessage && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <TriangleAlert /> {errorMessage}
        </p>
      )}
    </div>
  );
};
export default FormUploadImage;
