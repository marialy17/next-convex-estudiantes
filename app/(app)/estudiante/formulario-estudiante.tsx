"use client";

import { Button } from "@/app/_styles/components/ui/button";
import { Input } from "@/app/_styles/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_styles/components/ui/select";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_styles/components/ui/form";
import { estudianteSchema, type EstudianteFormValues } from "../schemas/estudiante.schema";

// Define un tipo explícito para asegurar consistencia
export type Estudiante = {
  _id?: Id<"estudiantes">;
  numeroMatricula: string;
  nombre: string;
  correo: string;
  carrera: string;
  grado: string;
  edad: number;
};

export function FormularioEstudiante({
  estudiante,
  onSuccess,
}: {
  estudiante?: Estudiante;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMutation = useMutation(api.estudiantes.crearEstudiante);
  const updateMutation = useMutation(api.estudiantes.actualizarEstudiante);

  // Configurar react-hook-form con validación de Zod
  const form = useForm<EstudianteFormValues>({
    resolver: zodResolver(estudianteSchema),
    defaultValues: {
      numeroMatricula: estudiante?.numeroMatricula || "",
      nombre: estudiante?.nombre || "",
      correo: estudiante?.correo || "",
      carrera: estudiante?.carrera || "",
      grado: estudiante?.grado || "",
      edad: estudiante?.edad || 0, // Usar 0 como valor predeterminado en lugar de undefined
    },
    mode: "onTouched", // Validará cuando el usuario abandone el campo (onBlur)
  });

  const onSubmit = async (values: EstudianteFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (estudiante?._id) {
        await updateMutation({
          id: estudiante._id,
          ...values,
          // Aseguramos que edad sea un número
          edad: Number(values.edad),
        });
      } else {
        await createMutation({
          ...values,
          // Aseguramos que edad sea un número
          edad: Number(values.edad),
        });
      }

      onSuccess?.();
    } catch (err) {
      console.error("Error al guardar estudiante:", err);
      setError("Ocurrió un error al procesar la solicitud. Por favor intenta de nuevo.");
      // Desplazar a la parte superior para mostrar el error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Mensaje de error general */}
        {error && (
          <div className="text-red-500 text-sm p-3 bg-red-50 border border-red-200 rounded-lg shadow-sm animate-pulse">
            <p>{error}</p>
          </div>
        )}

        {/* Número de matrícula */}
        <FormField
          control={form.control}
          name="numeroMatricula"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700">Matrícula</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ingresa el número de matrícula"
                  className="w-full transition-all focus-within:ring-2 focus-within:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* Nombre completo */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700">Nombre completo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nombre y apellidos"
                  className="w-full"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* Correo electrónico */}
        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700">Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="ejemplo@universidad.edu"
                  className="w-full"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* Edad - nuevo campo con validación mejorada */}
        <FormField
          control={form.control}
          name="edad"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700">Edad</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={5}
                  max={18}
                  placeholder="Edad del estudiante (5-18 años)"
                  className="w-full"
                  value={field.value}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : parseInt(value, 10));
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* Carrera */}
        <FormField
          control={form.control}
          name="carrera"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700">Carrera</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una carrera" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                  <SelectItem value="Medicina">Medicina</SelectItem>
                  <SelectItem value="Derecho">Derecho</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* Grado académico */}
        <FormField
          control={form.control}
          name="grado"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700">Grado académico</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un grado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1er Semestre">1er Semestre</SelectItem>
                  <SelectItem value="2do Semestre">2do Semestre</SelectItem>
                  <SelectItem value="3er Semestre">3er Semestre</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* Botones responsivos */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/estudiante")}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              estudiante ? "Guardar cambios" : "Crear estudiante"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}