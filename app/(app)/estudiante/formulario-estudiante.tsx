"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Estudiante = {
  _id?: Id<"estudiantes">;
  numeroMatricula: string;
  nombre: string;
  correo: string;
  carrera: string;
  grado: string;
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

  const [formData, setFormData] = useState({
    numeroMatricula: estudiante?.numeroMatricula || "",
    nombre: estudiante?.nombre || "",
    correo: estudiante?.correo || "",
    carrera: estudiante?.carrera || "",
    grado: estudiante?.grado || "",
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
      if (estudiante?._id) {
        await updateMutation({
          id: estudiante._id,
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
        <label className="block text-sm font-medium text-gray-700">Matrícula</label>
        <Input
          name="numeroMatricula"
          value={formData.numeroMatricula}
          onChange={handleChange}
          required
          placeholder="Ingresa el número de matrícula"
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
          placeholder="ejemplo@universidad.edu"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Carrera</label>
        <Select
          value={formData.carrera}
          onValueChange={(value) => handleSelectChange("carrera", value)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una carrera" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ingeniería">Ingeniería</SelectItem>
            <SelectItem value="Medicina">Medicina</SelectItem>
            <SelectItem value="Derecho">Derecho</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Grado académico</label>
        <Select
          value={formData.grado}
          onValueChange={(value) => handleSelectChange("grado", value)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un grado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1er Semestre">1er Semestre</SelectItem>
            <SelectItem value="2do Semestre">2do Semestre</SelectItem>
            <SelectItem value="3er Semestre">3er Semestre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botones responsivos: en móvil ocupan todo el ancho */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
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
  );
}