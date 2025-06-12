import { z } from 'zod';

import { categories } from './categories';
import { TEXT_AREA_MAX_LENGTH } from './constants';

const categoryValues = categories.map((item) => item.label);

export const campingSchema = z.object({
  title: z
    .string()
    .refine((val) => val.trim().length >= 1, { message: 'Title is required' })
    .refine((val) => val.trim().length >= 2, { message: 'Title must be at least 2 characters' }),
  price: z.coerce.number().min(1, { message: 'Price is required' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(TEXT_AREA_MAX_LENGTH, { message: `Maximum ${TEXT_AREA_MAX_LENGTH} characters allowed` }),
  category: z
    .string()
    .min(1, { message: 'Category is required' })
    .refine((val) => categoryValues.includes(val), {
      message: 'Invalid category',
    }),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  image: z.string().nonempty({ message: 'Please upload an image' }),
});

export const profileSchema = z.object({
  firstName: z
    .string()
    .refine((val) => val.trim().length >= 1, { message: 'First name is required' })
    .refine((val) => val.trim().length >= 2, { message: 'First name must be at least 2 characters' }),
  lastName: z
    .string()
    .refine((val) => val.trim().length >= 1, { message: 'Last name is required' })
    .refine((val) => val.trim().length >= 2, { message: 'Last name must be at least 2 characters' }),
});
