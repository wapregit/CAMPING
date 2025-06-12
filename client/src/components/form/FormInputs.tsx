import { TriangleAlert } from 'lucide-react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputsProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
};

const FormInputs = <T extends FieldValues>({ label, name, type, register, errors, placeholder }: FormInputsProps<T>) => {
  const errorMessage = errors?.[name]?.message as string | undefined;
  const registerOptions = type === 'number' ? { valueAsNumber: true } : undefined;

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name} className="mb-1 capitalize">
        {label}
      </Label>
      <Input
        {...register(name, registerOptions)}
        type={type}
        id={name}
        autoComplete="off"
        className={errorMessage ? 'border-red-500' : ''}
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <TriangleAlert /> {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormInputs;
