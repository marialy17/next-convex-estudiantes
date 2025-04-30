import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  estudiantes: defineTable({
    numeroMatricula: v.string(),
    nombre: v.string(),
    correo: v.string(),
    carrera: v.string(),
    grado: v.string(),
  }),
  maestros: defineTable({
    numeroEmpleado: v.string(),
    nombre: v.string(),
    correo: v.string(),
    departamento: v.string(),
    especialidad: v.string(),
  }),
});