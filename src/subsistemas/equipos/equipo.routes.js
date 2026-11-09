
const r = require("express").Router();
const c = require("./equipo.controller");
const auth = require("../../shared/middlewares/authenticate");
const allow = require("../../shared/middlewares/authorize");

r.use(auth);

r.get("/", c.findAll);

// Nueva ruta para obtener el resumen
r.get("/:id/resumen", c.getResumen);

r.get("/:id", c.findById);

r.post("/", allow("ADMIN"), c.create);
r.put("/:id", allow("ADMIN"), c.update);
r.delete("/:id", allow("ADMIN"), c.remove);

module.exports = r;
