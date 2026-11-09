const p = require("../../shared/database/prisma");

module.exports = {
    create: data => p.tarea.create({
        data,
        include: {
            equipo: true,
            responsable: true
        }
    }),

    findAll: (estado) => p.tarea.findMany({
        where: estado ? { estado } : {},
        include: {
            equipo: true,
            responsable: {
                select: {
                    id: true,
                    nombre: true,
                    correo: true
                }
            },
            _count: {
                select: {
                    comentarios: true
                }
            }
        },
        orderBy: {
            id: "asc"
        }
    }),

    findById: id => p.tarea.findUnique({
        where: { id },
        include: {
            equipo: true,
            responsable: true,
            comentarios: {
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nombre: true
                        }
                    }
                }
            }
        }
    }),

    update: (id, data) => p.tarea.update({
        where: { id },
        data
    }),

    remove: id => p.tarea.delete({
        where: { id }
    })
};