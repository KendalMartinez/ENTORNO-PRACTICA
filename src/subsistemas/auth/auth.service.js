const bcrypt = require("bcryptjs");
const repo = require("./auth.repository");
const AppError = require("../../shared/errors/AppError");
const jwt = require("../../shared/utils/jwt");
const login = async ({ correo, password }) => {
  if (!correo || !password) throw new AppError("Correo y password son obligatorios", 400);
  const usuario = await repo.findByEmail(correo);
  if (!usuario || !usuario.activo || !(await bcrypt.compare(password, usuario.password))) {
    throw new AppError("Credenciales incorrectas", 401);
  }
  return { token: jwt.sign(usuario), usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol } };
};
module.exports = { login };
