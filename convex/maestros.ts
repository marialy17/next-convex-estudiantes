import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const crearMaestro = mutation({
  args: {
    numeroEmpleado: v.string(),
    nombre: v.string(),
    correo: v.string(),
    departamento: v.string(),
    gradoAcademico: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("maestros", args);
  },
});

export const obtenerMaestros = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("maestros").collect();
  },
});

export const actualizarMaestro = mutation({
  args: {
    id: v.id("maestros"),
    numeroEmpleado: v.string(),
    nombre: v.string(),
    correo: v.string(),
    departamento: v.string(),
    gradoAcademico: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
    return await ctx.db.get(id);
  },
});

export const eliminarMaestro = mutation({
  args: { id: v.id("maestros") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
