/**
 * # app/page.tsx
 * * Página principal de la aplicación.
 *   Implementa un diseño centrado y responsive para el contenido inicial.
 */
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto py-10 flex flex-col items-center">
      <div className="text-center max-w-lg">
        <h1 className="text-2xl font-bold mb-5">Bienvenido a la Aplicación de Escuela GM</h1>
        <p className="text-lg">
          Esta es una aplicación de ejemplo para la gestión de estudiantes y maestros.
          Utiliza tecnologías modernas como React, Next.js y Tailwind CSS.
        </p>
        <p className="mt-4 mb-8">
          Navega a las secciones de Estudiantes o Maestros para comenzar.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <Link href="/estudiante" className="px-5 py-2 bg-white text-black border border-black rounded hover:bg-black hover:text-white transition-colors">
            Estudiantes
          </Link>
          <Link href="/maestro" className="px-5 py-2 bg-white text-black border border-black rounded hover:bg-black hover:text-white transition-colors">
            Maestros
          </Link>
        </div>
      </div>
    </main>
  );
}