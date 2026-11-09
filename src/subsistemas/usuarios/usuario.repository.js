const prisma = require("../../shared/database/prisma");
const create = data => prisma.usuario.create({ data, select: { id:true,nombre:true,correo:true,rol:true,activo:true,equipoId:true,creadoEn:true } });
const findAll = () => prisma.usuario.findMany({ select: { id:true,nombre:true,correo:true,rol:true,activo:true,equipoId:true,creadoEn:true }, orderBy:{id:"asc"} });
const findById = id => prisma.usuario.findUnique({ where:{id}, select:{id:true,nombre:true,correo:true,rol:true,activo:true,equipoId:true,creadoEn:true} });
const findByEmail = correo => prisma.usuario.findUnique({ where:{correo} });
const update = (id,data) => prisma.usuario.update({ where:{id},data,select:{id:true,nombre:true,correo:true,rol:true,activo:true,equipoId:true} });
const remove = id => prisma.usuario.delete({ where:{id} });
module.exports={create,findAll,findById,findByEmail,update,remove};
