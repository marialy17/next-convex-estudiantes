import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  estudiantes: defineTable({
    numeroMatricula: v.string(),
    nombre: v.string(),
    correo: v.string(),
    carrera: v.string(),
    grado: v.string(),
    edad: v.number(),
    userId: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
  
  maestros: defineTable({
    numeroEmpleado: v.string(),
    nombre: v.string(),
    correo: v.string(),
    departamento: v.string(),
    especialidad: v.string(),
    userId: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
  
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    role: v.string(), // "admin", "maestro", "estudiante"
    name: v.optional(v.string()),
  }).index("by_clerkId", ["clerkId"]),
});