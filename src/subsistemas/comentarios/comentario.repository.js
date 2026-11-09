const p = require("../../shared/database/prisma");
module.exports = {
  create: (data) =>
    p.comentario.create({
      data,
      include: { usuario: { select: { id: true, nombre: true } } },
    }),
  findByTask: (tareaId) =>
    p.comentario.findMany({
      where: { tareaId },
      include: { usuario: { select: { id: true, nombre: true } } },
      orderBy: { id: "asc" },
    }),
  findById: (id) => p.comentario.findUnique({ where: { id } }),
  update: (id, contenido) =>
    p.comentario.update({ where: { id }, data: { contenido } }),
  remove: (id) => p.comentario.delete({ where: { id } }),
};
