import { z } from 'zod';

export const userFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать от 2 до 64 символов').max(64, 'Имя должно содержать от 2 до 64 символов'),
  username: z.string().min(2, 'Никнейм должен содержать от 2 до 64 символов').max(64, 'Никнейм должен содержать от 2 до 64 символов'),
  email: z.string().email('Некорректный email'),
  city: z.string().min(2, 'Город должен содержать от 2 до 64 символов').max(64, 'Город должен содержать от 2 до 64 символов'),
  phone: z.string().regex(/^\d*$/, 'Телефон должен содержать только цифры'),
  companyName: z.string().min(2, 'Название компании должно содержать от 2 до 64 символов').max(64, 'Название компании должно содержать от 2 до 64 символов'),
});

export type UserFormValidation = z.infer<typeof userFormSchema>;