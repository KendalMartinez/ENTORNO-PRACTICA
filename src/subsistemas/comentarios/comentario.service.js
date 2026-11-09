const r = require("./comentario.repository"),
    AppError = require("../../shared/errors/AppError");
const own = async (id, user) => {
    const x = await r.findById(id);
    if (!x) throw new AppError("Comentario no encontrado", 404);
    if (x.usuarioId !== user.id && user.rol !== "ADMIN")
        throw new AppError("No puede modificar este comentario", 403);
    return x;
};
module.exports = {
    create: (tareaId, usuarioId, d) => {
        if (!d.contenido) throw new AppError("contenido obligatorio", 400);
        if (!d.contenido.length()>500) throw new AppError("El contenido debe ser menor a 500 caracteres", 400);
        return r.create({ contenido: d.contenido, tareaId, usuarioId });
    },
    findByTask: (id) => r.findByTask(id),
    update: async (id, d, u) => {
        if (!d.contenido) throw new AppError("contenido obligatorio", 400);
        if (!d.contenido.length()>500) throw new AppError("El contenido debe ser menor a 500 caracteres", 400);
        await own(id, u);
        return r.update(id, d.contenido);
    },
    remove: async (id, u) => {
        await own(id, u);
        await r.remove(id);
    },
};
