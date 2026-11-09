const r = require("express").Router(),
  c = require("./comentario.controller"),
  auth = require("../../shared/middlewares/authenticate");
r.use(auth);
r.get("/tarea/:tareaId", c.findByTask);
r.post("/tarea/:tareaId", c.create);
r.put("/:id", c.update);
r.delete("/:id", c.remove);
module.exports = r;
