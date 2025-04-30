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
import {
  maestroSchema,
  type MaestroFormValues,
} from "../schemas/maestros.schema";

// Tipo para el maestro
export type Maestro = {
  _id?: Id<"maestros">;
  numeroEmpleado: string;
  nombre: string;
  correo: string;
  departamento: string;
  especialidad: string;
};

export function FormularioMaestro({
  maestro,
  onSuccess,
}: {
  maestro?: Maestro;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMutation = useMutation(api.maestros.crearMaestro);
  const updateMutation = useMutation(api.maestros.actualizarMaestro);

  const form = useForm<MaestroFormValues>({
    resolver: zodResolver(maestroSchema),
    defaultValues: {
      numeroEmpleado: maestro?.numeroEmpleado || "",
      nombre: maestro?.nombre || "",
      correo: maestro?.correo || "",
      departamento: maestro?.departamento || "",
      especialidad: maestro?.especialidad || "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: MaestroFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (maestro?._id) {
        await updateMutation({ id: maestro._id, ...values });
      } else {
        await createMutation(values);
      }

      onSuccess?.();
    } catch (err) {
      console.error("Error al guardar maestro:", err);
      setError("Ocurrió un error al procesar la solicitud. Por favor intenta de nuevo.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="text-red-500 text-sm p-3 bg-red-50 border border-red-200 rounded-lg shadow-sm animate-pulse">
            <p>{error}</p>
          </div>
        )}

        {/* Número de empleado */}
        <FormField
          control={form.control}
          name="numeroEmpleado"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Número de empleado</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ej: EMP123"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nombre */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nombre y apellidos"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Correo */}
        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="ejemplo@universidad.edu"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Departamento */}
        <FormField
          control={form.control}
          name="departamento"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Departamento</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un departamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ciencias Básicas">Ciencias Básicas</SelectItem>
                  <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                  <SelectItem value="Ciencias Sociales">Ciencias Sociales</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Especialidad */}
        <FormField
          control={form.control}
          name="especialidad"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Especialidad</FormLabel>
              <FormControl>
                
                <Input
                  {...field}
                  placeholder="Ej: Matemáticas, Redes, Derecho..."
                  className="w-full"
                />
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botones */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/maestro")}
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
            ) : maestro ? "Guardar cambios" : "Crear maestro"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
