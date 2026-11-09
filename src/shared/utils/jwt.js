const jwt = require("jsonwebtoken");
const sign = usuario => jwt.sign(
  { sub: usuario.id, correo: usuario.correo, rol: usuario.rol },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
);
const verify = token => jwt.verify(token, process.env.JWT_SECRET);
module.exports = { sign, verify };
