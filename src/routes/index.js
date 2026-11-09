const router=require("express").Router();
router.get("/health",(req,res)=>res.json({success:true,message:"SprintBoard API funcionando"}));
router.use("/auth",require("../subsistemas/auth/auth.routes"));
router.use("/usuarios",require("../subsistemas/usuarios/usuario.routes"));
router.use("/equipos",require("../subsistemas/equipos/equipo.routes"));
router.use("/tareas",require("../subsistemas/tareas/tarea.routes"));
router.use("/comentarios",require("../subsistemas/comentarios/comentario.routes"));
router.use("/reportes",require("../subsistemas/reportes/reporte.routes"));
module.exports=router;
