const AppError = require("../errors/AppError");
const { verify } = require("../utils/jwt");
module.exports = (req, res, next) => {
  try {
    const value = req.headers.authorization;
    if (!value?.startsWith("Bearer ")) throw new AppError("Token requerido", 401);
    const payload = verify(value.slice(7));
    req.user = { id: Number(payload.sub), correo: payload.correo, rol: payload.rol };
    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError("Token inválido o vencido", 401));
  }
};
