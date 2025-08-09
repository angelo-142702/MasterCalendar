import { z } from "zod"

// Definir el esquema de validación con zod
export const registroSchema  = z.object({
  name: z.string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
  email: z.string()
    .email({ message: 'Debe proporcionar un correo electrónico válido' }),
  phone: z.string()
    .regex(/^\d{11}$/, { message: 'El teléfono debe tener exactamente 10 dígitos' }),
  password: z.string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
    .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' }),
  rol: z.enum([ 'user', 'representante'], { message: 'El rol debe ser admin, user o editor' }),
});
export const loginSchema  = z.object({
  email: z.string()
    .email({ message: 'Debe proporcionar un correo electrónico válido' }),
  password: z.string()
    .min(6, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
    .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' }),
});

