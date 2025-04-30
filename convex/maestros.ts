import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Obtener todos los maestros (query)
export const obtenerMaestros = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("maestros").collect();
  },
});

// Obtener un maestro por ID (query)
export const obtenerMaestroPorId = query({
  args: { id: v.id("maestros") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Crear un maestro (mutation)
export const crearMaestro = mutation({
  args: {
    numeroEmpleado: v.string(),
    nombre: v.string(),
    correo: v.string(),
    departamento: v.string(),
    especialidad: v.string(),
  },
  handler: async (ctx, args) => {
    const nuevoId = await ctx.db.insert("maestros", {
      numeroEmpleado: args.numeroEmpleado,
      nombre: args.nombre,
      correo: args.correo,
      departamento: args.departamento,
      especialidad: args.especialidad,
    });
    return nuevoId;
  },
});

// Actualizar un maestro (mutation)
export const actualizarMaestro = mutation({
  args: {
    id: v.id("maestros"),
    numeroEmpleado: v.string(),
    nombre: v.string(),
    correo: v.string(),
    departamento: v.string(),
    especialidad: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...datosActualizados } = args;
    await ctx.db.patch(id, datosActualizados);
    return id;
  },
});

// Eliminar un maestro (mutation)
export const eliminarMaestro = mutation({
  args: { id: v.id("maestros") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});