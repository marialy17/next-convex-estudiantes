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
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CirclePlus, Edit } from "lucide-react";
import Link from "next/link";
import { DialogEliminarEstudiante } from "./dialog-eliminar-estudiante";

export function TablaEstudiantes() {
  const estudiantes = useQuery(api.estudiantes.obtenerEstudiantes);

  // Estado de carga mejorado
  if (estudiantes === undefined) {
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
          <p className="text-lg font-semibold">Lista de Estudiantes</p>
          <div className="flex justify-end">
            <Link href="/estudiante/nuevo">
              <Button variant="outline" size="icon">
                <CirclePlus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Matrícula</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Carrera</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estudiantes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No hay estudiantes registrados
                </TableCell>
              </TableRow>
            ) : (
              estudiantes.map((estudiante) => (
                <TableRow key={estudiante._id}>
                  <TableCell className="font-medium">
                    {estudiante.numeroMatricula}
                  </TableCell>
                  <TableCell>{estudiante.nombre}</TableCell>
                  <TableCell>{estudiante.correo}</TableCell>
                  <TableCell>{estudiante.carrera}</TableCell>
                  <TableCell>{estudiante.grado}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <DialogEliminarEstudiante id={estudiante._id} />
                      <Link href={`/estudiante/editar/${estudiante._id}`}>
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