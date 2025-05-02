//app/(app)/maestro/page.tsx
"use client";

import { TablaMaestros } from "./tabla-maestros";

export default function MaestroPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Administración de Maestros</h1>
      <TablaMaestros />
    </div>
  );
}