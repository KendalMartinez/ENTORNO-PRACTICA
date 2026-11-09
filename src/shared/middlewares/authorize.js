const AppError = require("../errors/AppError");
module.exports = (...roles) => (req, res, next) => {
  if (!req.user) return next(new AppError("No autenticado", 401));
  if (!roles.includes(req.user.rol)) return next(new AppError("No autorizado", 403));
  next();
};
