const r = require("./tarea.repository"),
    AppError = require("../../shared/errors/AppError");
const one = async id => {
    const x = await r.findById(id);
    if (!x) throw new AppError("Tarea no encontrada", 404);
    return x
};
module.exports = {
    create: d => {
        if (!d.titulo || !d.equipoId)
            throw new AppError("titulo y equipoId obligatorios", 400);
        return r.create(d)
    },
    findAll: async (estado) => {
        const estadosValidos = ["PENDIENTE", "EN_PROGRESO", "COMPLETADA"];

        if (estado && !estadosValidos.includes(estado)) {
            throw new AppError("Estado de tarea no válido", 400);
        }

        return r.findAll(estado);
    },
    findById: one,
    update: async (id, d) => {
        await one(id);
        return r.update(id, d)
    },
    remove: async id => {
        await one(id);
        await r.remove(id)
    }
};
