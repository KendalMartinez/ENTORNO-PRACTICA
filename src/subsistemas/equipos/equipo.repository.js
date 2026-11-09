
const prisma = require("../../shared/database/prisma");

module.exports = {
  create: data => prisma.equipo.create({ data }),

  findAll: () => prisma.equipo.findMany({
    include: {
      usuarios: true,
      _count: { select: { tareas: true } }
    }
  }),

  findById: id => prisma.equipo.findUnique({
    where: { id },
    include: { usuarios: true, tareas: true }
  }),

  getResumen: id => prisma.equipo.findUnique({
    where: { id },
    select: {
      id: true,
      _count: {
        select: {
          usuarios: true,
          tareas: true
        }
      }
    }
  }),

  update: (id, data) => prisma.equipo.update({
    where: { id },
    data
  }),

  remove: id => prisma.equipo.delete({
    where: { id }
  })
};
