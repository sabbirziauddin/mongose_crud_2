import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  // .refine((value) => /^[A-Z]/.test(value), {
  //   message: 'First Name must start with a capital letter',
  // }),
  lastName: z.string().min(1),
});

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

export const productValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
});

export const userValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().min(1),
  password: z.string().max(20).min(1),
  fullName: fullNameValidationSchema,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(productValidationSchema).optional(),
});

export default userValidationSchema;
