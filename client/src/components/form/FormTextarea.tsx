import { useEffect, useState } from 'react';

import { TriangleAlert } from 'lucide-react';
import { FieldErrors, FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type FormTextareaProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  watch?: UseFormWatch<T>;
  maxLength?: number;
  placeholder?: string;
};

const FormTextarea = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  watch,
  maxLength,
  placeholder
}: FormTextareaProps<T>) => {
  const errorMessage = errors?.[name]?.message as string | undefined;
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (watch) {
      const subscription = watch((value) => {
        const text = (value?.[name] as string) ?? '';
        setCharCount(text.length);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, name]);

  const isOverLimit = maxLength !== undefined && charCount > maxLength;

  return (
    <div className="relative flex flex-col gap-1">
      <Label htmlFor={name} className="mb-1 capitalize">
        {label}
      </Label>
      <Textarea
        className={`h-24 resize-none pr-24 ${errorMessage || isOverLimit ? 'border-red-500' : ''}`}
        {...register(name)}
        id={name}
        autoComplete="off"
        placeholder={placeholder}
      />

      <div
        className={`absolute bottom-2 right-2 text-xs ${
          isOverLimit ? 'text-red-500' : 'text-gray-400'
        } pointer-events-none`}
      >
        {charCount} / {maxLength} characters
      </div>

      {errorMessage && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <TriangleAlert /> {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;
