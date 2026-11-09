require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
// KENDAL MARTINEZ ESTUVE ACA. MUCHO GUSTO........
async function main() {
  const equipo = await prisma.equipo.upsert({
    where: { nombre: "Backend Team" },
    update: {},
    create: { nombre: "Backend Team", descripcion: "Equipo del simulacro Git" }
  });
  await prisma.usuario.upsert({
    where: { correo: "admin@sprintboard.com" },
    update: {},
    create: {
      nombre: "Administrador",
      correo: "admin@sprintboard.com",
      password: await bcrypt.hash("Admin12345", 12),
      rol: "ADMIN",
      equipoId: equipo.id
    }
  });
  console.log("Seed listo. Usuario: admin@sprintboard.com / Admin12345");
}
main().catch(console.error).finally(() => prisma.$disconnect());
