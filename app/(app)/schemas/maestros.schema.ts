import { z } from 'zod';

export const maestroSchema = z.object({
  numeroEmpleado: z.string()
    .min(5, "El número de empleado debe tener al menos 5 caracteres")
    .max(15, "El número de empleado no puede exceder 15 caracteres"),
  nombre: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  correo: z.string()
    .email("Correo electrónico inválido")
    .min(5, "El correo debe tener al menos 5 caracteres"),
  departamento: z.string()
    .min(1, "Debes seleccionar un departamento"),
  especialidad: z.string()
    .min(1, "Debes seleccionar una especialidad")
});

export type MaestroFormValues = z.infer<typeof maestroSchema>;