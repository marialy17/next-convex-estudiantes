"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Trash2 } from "lucide-react";

export function DialogEliminarEstudiante({
  id,
  onSuccess,
  children,
}: {
  id: Id<"estudiantes">;
  onSuccess?: () => void;
  children?: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const deleteMutation = useMutation(api.estudiantes.eliminarEstudiante);
  
    const handleDelete = async () => {
      setIsDeleting(true);
      setError(null);
      
      try {
        await deleteMutation({ id });
        setOpen(false);
        onSuccess?.();
      } catch (err) {
        setError("No se pudo eliminar el estudiante" + err);
      } finally {
        setIsDeleting(false);
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children || <Button variant="outline" size="icon">{ <Trash2 className="h-4 w-4"/>} </Button>}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar estudiante?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }