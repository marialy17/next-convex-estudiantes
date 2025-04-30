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

type Maestro = {
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

  const [formData, setFormData] = useState({
    numeroEmpleado: maestro?.numeroEmpleado || "",
    nombre: maestro?.nombre || "",
    correo: maestro?.correo || "",
    departamento: maestro?.departamento || "",
    especialidad: maestro?.especialidad || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (maestro?._id) {
        await updateMutation({
          id: maestro._id,
          ...formData
        });
      } else {
        await createMutation(formData);
      }

      onSuccess?.();
    } catch (err) {
      setError("Ocurrió un error al procesar la solicitud: " + err);
      // Desplazar a la parte superior para mostrar el error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Mensaje de error con animación y mejor visibilidad */}
      {error && (
        <div className="text-red-500 text-sm p-3 bg-red-50 border border-red-200 rounded-lg shadow-sm animate-pulse">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Número de Empleado</label>
        <Input
          name="numeroEmpleado"
          value={formData.numeroEmpleado}
          onChange={handleChange}
          required
          placeholder="Ingresa el número de empleado"
          className="w-full transition-all focus-within:ring-2 focus-within:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
        <Input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Nombre y apellidos"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <Input
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          required
          placeholder="profesor@universidad.edu"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Departamento</label>
        <Select
          value={formData.departamento}
          onValueChange={(value) => handleSelectChange("departamento", value)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ciencias">Ciencias</SelectItem>
            <SelectItem value="Humanidades">Humanidades</SelectItem>
            <SelectItem value="Ingeniería">Ingeniería</SelectItem>
            <SelectItem value="Medicina">Medicina</SelectItem>
            <SelectItem value="Derecho">Derecho</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Especialidad</label>
        <Select
          value={formData.especialidad}
          onValueChange={(value) => handleSelectChange("especialidad", value)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una especialidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Matemáticas">Matemáticas</SelectItem>
            <SelectItem value="Física">Física</SelectItem>
            <SelectItem value="Química">Química</SelectItem>
            <SelectItem value="Literatura">Literatura</SelectItem>
            <SelectItem value="Historia">Historia</SelectItem>
            <SelectItem value="Sistemas">Sistemas</SelectItem>
            <SelectItem value="Civil">Civil</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botones responsivos: en móvil ocupan todo el ancho */}
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
          ) : (
            maestro ? "Guardar cambios" : "Crear maestro"
          )}
        </Button>
      </div>
    </form>
  );
}