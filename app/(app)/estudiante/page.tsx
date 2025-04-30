//app/(app)/estudiante/page.tsx
"use client";

import { TablaEstudiantes } from "./tabla-estudiantes";

export default function EstudiantePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Administración de Estudiantes</h1>
      <TablaEstudiantes />
    </div>
  );
}