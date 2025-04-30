"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_styles/components/ui/table";
import { Skeleton } from "@/app/_styles/components/ui/skeleton";
import { Button } from "@/app/_styles/components/ui/button";
import { CirclePlus, Edit, Eye } from "lucide-react";
import Link from "next/link";
import { DialogEliminarMaestro } from "./dialog-eliminar-maestro";

export function TablaMaestros() {
  const maestros = useQuery(api.maestros.obtenerMaestros);

  // Estado de carga mejorado
  if (maestros === undefined) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(6)].map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-[80%]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="flex flex-col p-4">
        <div className="flex justify-between p-4">
          <p className="text-lg font-semibold">Lista de Maestros</p>
          <div className="flex justify-end">
            <Link href="/maestro/nuevo">
              <Button variant="outline" size="icon">
                <CirclePlus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No. Empleado</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maestros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No hay maestros registrados
                </TableCell>
              </TableRow>
            ) : (
              maestros.map((maestro) => (
                <TableRow key={maestro._id}>
                  <TableCell className="font-medium">
                    {maestro.numeroEmpleado}
                  </TableCell>
                  <TableCell>{maestro.nombre}</TableCell>
                  <TableCell>{maestro.correo}</TableCell>
                  <TableCell>{maestro.departamento}</TableCell>
                  <TableCell>{maestro.especialidad}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <DialogEliminarMaestro id={maestro._id} />
                      <Link href={`/maestro/ver/${maestro._id}`}>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/maestro/editar/${maestro._id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}