const s = require("./tarea.service");
const w = fn => async (req, res, next) => {
    try { await fn(req, res) }
    catch (e) { next(e) }
};
module.exports = {
    create: w(async (req, res) => res.status(201).json({
        success: true, data: await s.create(req.body)
    })),
    findAll: w(async (req, res) => res.json({
        success: true,
        data: await s.findAll(req.query.estado)
    })),
    findById: w(async (req, res) => res.json({
        success: true, data: await s.findById(+req.params.id)
    })),
    update: w(async (req, res) => res.json({
        success: true, data: await s.update(+req.params.id, req.body)
    })),
    remove: w(async (req, res) => { await s.remove(+req.params.id); res.json({ success: true, message: "Tarea eliminada" }) })
};
