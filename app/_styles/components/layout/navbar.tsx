"use client";

/**
 * # components/layout/navbar.tsx
 * * Define la barra de navegación principal de la aplicación.
 *   Incluye: logo, controles de tema y navegación.
 */

import { ThemeToggle } from "@/app/_styles/components/theme/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { School, BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/app/_styles/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const APP_TITLE = "Escuela GM" as const;

/**
 * # Barra de navegación principal de la aplicación.
 *
 * ## Descripción:
 * Componente que proporciona la barra de navegación superior de la aplicación.
 * Implementa un diseño responsive con posicionamiento fijo y altura consistente.
 *
 * ## Características:
 * - Posicionamiento sticky en la parte superior
 * - Altura fija de 64px (h-16)
 * - Sistema de espaciado responsive (mobile-first)
 * - Integración con el sistema de temas claro/oscuro
 * - Accesibilidad mejorada con aria-labels
 * - Navegación a home mediante el título
 *
 * ## Estructura:
 * - Logo/Título: Enlazado a la página principal
 * - Enlaces de navegación: Estudiantes y Maestros
 * - Controles: Contenedor flexible para elementos de control (tema, etc.)
 *
 * ## Uso:
 * ```tsx
 * // En un layout o página
 * import { Navbar } from "@/components/layout/navbar";
 *
 * export default function Layout() {
 *   return (
 *     <>
 *       <Navbar />
 *       <main>Contenido de la pagina</main>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link ThemeToggle} - Componente para alternar entre temas
 */
export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    {
      href: "/estudiante",
      label: "Estudiantes",
      active: pathname === "/" || pathname.startsWith("/estudiante"),
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
    {
      href: "/maestro",
      label: "Maestros",
      active: pathname.startsWith("/maestro"),
      icon: <School className="h-4 w-4 mr-2" />,
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 container mx-auto">
        {/* Logo/Título */}
        <div className="flex items-center mr-4">
          <School className="h-6 w-6 mr-2" />
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h4 className="font-semibold text-lg">{APP_TITLE}</h4>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          className="md:hidden ml-auto"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop navigation */}
        <nav 
          className="hidden md:flex items-center space-x-4 ml-6 flex-1"
          aria-label="Navegación principal"
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Controles */}
        <div className="ml-auto hidden md:flex">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 border-b">
          <nav className="flex flex-col space-y-3" aria-label="Navegación móvil">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  route.active
                    ? "text-black dark:text-white bg-muted"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};