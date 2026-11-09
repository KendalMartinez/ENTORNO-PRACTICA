const prisma = require("../../shared/database/prisma");
const findByEmail = correo => prisma.usuario.findUnique({ where: { correo } });
module.exports = { findByEmail };
