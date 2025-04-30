"use client";

import { FormularioMaestro } from "../../formulario-maestro";
import { Button } from "@/app/_styles/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/app/_styles/components/ui/skeleton";
import { use } from "react";

export default function EditarMaestroPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const idMaestro = id as Id<"maestros">;
  
  // Obtener datos del maestro
  const maestro = useQuery(api.maestros.obtenerMaestroPorId, { id: idMaestro });

  if (maestro === undefined) {
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

  if (!maestro) {
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
            <h1 className="text-2xl font-bold">Maestro no encontrado</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p>El maestro que estás buscando no existe o ha sido eliminado.</p>
            <Button 
              onClick={() => router.push("/maestro")}
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
          <h1 className="text-2xl font-bold">Editar Maestro</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <FormularioMaestro 
            maestro={maestro}
            onSuccess={() => {
              // Redirige a la página de maestros después de editar exitosamente
              router.push("/maestro");
            }}
          />
        </div>
      </div>
    </div>
  );
}