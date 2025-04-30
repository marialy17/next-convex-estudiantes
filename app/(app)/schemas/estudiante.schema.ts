import { z } from "zod";

// Define el esquema para validar datos de estudiante
export const estudianteSchema = z.object({
  numeroMatricula: z.string()
    .min(5, "La matrícula debe tener al menos 5 caracteres")
    .max(15, "La matrícula no puede exceder 15 caracteres"),
  nombre: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  correo: z.string()
    .email("Correo electrónico inválido")
    .min(5, "El correo debe tener al menos 5 caracteres"),
  carrera: z.string()
    .min(1, "Debes seleccionar una carrera"),
  grado: z.string()
    .min(1, "Debes seleccionar un grado académico"),
  edad: z.number()
    .int("La edad debe ser un número entero")
    .min(5, "La edad mínima es 5 años")
    .max(18, "La edad máxima es 18 años")
});

// Exportar tipo inferido del esquema
export type EstudianteFormValues = z.infer<typeof estudianteSchema>;