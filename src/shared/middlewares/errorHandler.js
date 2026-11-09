const { Prisma } = require("@prisma/client");
module.exports = (error, req, res, next) => {
  console.error(error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") return res.status(409).json({ success: false, message: "Registro duplicado" });
    if (error.code === "P2025") return res.status(404).json({ success: false, message: "Registro no encontrado" });
    if (error.code === "P2003") return res.status(409).json({ success: false, message: "Relación inválida" });
  }
  res.status(error.statusCode || 500).json({ success: false, message: error.message || "Error interno" });
};
