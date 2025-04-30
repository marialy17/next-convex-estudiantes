"use client";

import { FormularioMaestro } from "../formulario-maestro";
import { Button } from "@/app/_styles/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NuevoMaestroPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-4 sm:p-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Volver
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold">Nuevo Maestro</h1>
          </div>

          <FormularioMaestro 
            onSuccess={() => {
              // Redirige a la página de maestros después de crear exitosamente
              router.push("/maestro");
            }}
          />
        </div>
      </div>
    </div>
  );
}