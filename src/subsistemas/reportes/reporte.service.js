const repo = require("./reporte.repository");

const resumen = async () => {
  const datos = await repo.resumen();

  const completadas = datos.tareasPorEstado
    .filter(item => item.estado === "COMPLETADA")
    .reduce((total, item) => total + item._count._all, 0);

  const porcentajeCompletadas = datos.tareas === 0
    ? 0
    : (completadas / datos.tareas) * 100;

  return {
    ...datos,
    porcentajeCompletadas
  };
};

module.exports = { resumen };