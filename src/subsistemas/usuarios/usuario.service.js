const bcrypt=require("bcryptjs");
const repo=require("./usuario.repository");
const AppError=require("../../shared/errors/AppError");
const create=async data=>{if(!data.nombre||!data.correo||!data.password)throw new AppError("nombre, correo y password son obligatorios",400);if(await repo.findByEmail(data.correo))throw new AppError("Correo registrado",409);return repo.create({...data,password:await bcrypt.hash(data.password,12)});};
const findAll=()=>repo.findAll();
const findById=async id=>{const row=await repo.findById(id);if(!row)throw new AppError("Usuario no encontrado",404);return row;};
const update=async(id,data)=>{await findById(id);if(data.password)data.password=await bcrypt.hash(data.password,12);return repo.update(id,data);};
const remove=async(id,actual)=>{await findById(id);if(id===actual)throw new AppError("No puede eliminar su propia cuenta",400);await repo.remove(id);};
module.exports={create,findAll,findById,update,remove};
