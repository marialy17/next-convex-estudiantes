"use client";

import { Button } from "@/app/_styles/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/app/_styles/components/ui/skeleton";
import Link from "next/link";
import { DialogEliminarMaestro } from "../../dialog-eliminar-maestro";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_styles/components/ui/card";
import { use } from "react";

export default function VerMaestroPage({ params }: { params: Promise<{ id: string }> }) {
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
          
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
          <h1 className="text-2xl font-bold">Detalles del Maestro</h1>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">{maestro.nombre}</CardTitle>
            <div className="flex gap-2">
              <DialogEliminarMaestro 
                id={maestro._id} 
                onDelete={() => router.push("/maestro")} 
              />
              <Link href={`/maestro/editar/${maestro._id}`}>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Número de Empleado</h3>
                  <p className="text-base font-medium mt-1">{maestro.numeroEmpleado}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Correo Electrónico</h3>
                  <p className="text-base font-medium mt-1">{maestro.correo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Departamento</h3>
                  <p className="text-base font-medium mt-1">{maestro.departamento}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Especialidad</h3>
                  <p className="text-base font-medium mt-1">{maestro.especialidad}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}