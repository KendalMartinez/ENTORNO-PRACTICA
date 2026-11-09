const service = require("./auth.service");
const login = async (req, res, next) => { try { res.json({ success: true, data: await service.login(req.body) }); } catch (e) { next(e); } };
const me = (req, res) => res.json({ success: true, data: req.user });
module.exports = { login, me };
