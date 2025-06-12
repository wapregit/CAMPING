import { useEffect } from 'react';

import { TriangleAlert } from 'lucide-react';
import { Control, FieldErrors, FieldValues, Path, UseFormRegister, useWatch } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/utils/categories';

type FormCategoryProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  setValue: (name: Path<T>, value: string) => void;
  register: UseFormRegister<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
};

const FormCategory = <T extends FieldValues>({
  label,
  name,
  setValue,
  register,
  control,
  errors,
}: FormCategoryProps<T>) => {
  const value = useWatch({ control, name });
  const errorMessage = errors?.[name]?.message as string | undefined;

  useEffect(() => {
    if (value === undefined) {
      setValue(name, '');
    }
  }, [value, name, setValue]);

  return (
    <div className="flex flex-col gap-1">
      <input hidden {...register(name)} />

      <Label htmlFor={name} className="mb-1 capitalize">
        {label}
      </Label>

      <Select value={value || ''} onValueChange={(val) => setValue(name, val)}>
        <SelectTrigger className="w-full" id={name}>
          <SelectValue placeholder="Please Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item) => (
            <SelectItem key={item.label} value={item.label}>
              <span className="flex items-center gap-2">
                {item.icon && <item.icon />}
                <a className="capitalize">{item.label}</a>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorMessage && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <TriangleAlert /> {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormCategory;
