/**
 * # app/page.tsx
 * * Página principal de la aplicación.
 *   Implementa un diseño centrado y responsive para el contenido inicial.
 */

import { TablaMaestros } from "@/app/(app)/maestro/tabla-maestros";
import { TablaEstudiantes } from "@/app/(app)/estudiante/tabla-estudiantes";

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <TablaEstudiantes />
      <TablaMaestros />
    </main>
  );
}