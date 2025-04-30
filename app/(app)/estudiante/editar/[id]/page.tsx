//app/(app)/estudiante/editar/[id]/page.tsx
"use client";

import { FormularioEstudiante } from "../../formulario-estudiante";
import { Button } from "@/app/_styles/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/app/_styles/components/ui/skeleton";
import { use } from "react";


export default function EditarEstudiantePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const idEstudiante = id as Id<"estudiantes">;

  // Obtener datos del estudiante
  const estudiante = useQuery(api.estudiantes.obtenerEstudiantePorId, { id: idEstudiante });

  if (estudiante === undefined) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4">
        <div className="w-full max-w-3xl py-10">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Volver
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <div className="pt-4 flex justify-end">
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!estudiante) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4">
        <div className="w-full max-w-3xl py-10">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Volver
            </Button>
            <h1 className="text-2xl font-bold">Estudiante no encontrado</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p>El estudiante que estás buscando no existe o ha sido eliminado.</p>
            <Button
              onClick={() => router.push("/")}
              className="mt-4"
            >
              Volver a la lista
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="w-full max-w-3xl py-10">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver
          </Button>
          <h1 className="text-2xl font-bold">Editar Estudiante</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <FormularioEstudiante
            estudiante={estudiante}
            onSuccess={() => {
              // Redirige a la página principal después de editar exitosamente
              router.push("/estudiante");
            }}
          />
        </div>
      </div>
    </div>
  );
}