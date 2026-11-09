
const repo = require("./equipo.repository");
const AppError = require("../../shared/errors/AppError");

const one = async id => {
  const x = await repo.findById(id);
  if (!x) throw new AppError("Equipo no encontrado", 404);
  return x;
};

module.exports = {
  create: data => {
    if (!data.nombre) throw new AppError("nombre obligatorio", 400);
    return repo.create(data);
  },

  findAll: () => repo.findAll(),

  findById: one,

  getResumen: async id => {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("ID de equipo inválido", 400);
    }

    const equipo = await repo.getResumen(id);

    if (!equipo) {
      throw new AppError("Equipo no encontrado", 404);
    }

    return {
      equipoId: equipo.id,
      cantidadUsuarios: equipo._count.usuarios,
      cantidadTareas: equipo._count.tareas
    };
  },

  update: async (id, data) => {
    await one(id);
    return repo.update(id, data);
  },

  remove: async id => {
    await one(id);
    await repo.remove(id);
  }
};
