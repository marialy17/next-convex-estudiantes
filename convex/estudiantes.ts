// convex/estudiantes.ts
import { query } from "./_generated/server";

export const obtenerEstudiantes = query({
  handler: async (ctx) => {
    return ctx.db.query("estudiantes").collect(); // ← trae todos
  },
});
