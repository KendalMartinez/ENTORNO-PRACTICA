const s=require("./usuario.service");
const create=async(req,res,next)=>{try{res.status(201).json({success:true,data:await s.create(req.body)})}catch(e){next(e)}};
const findAll=async(req,res,next)=>{try{res.json({success:true,data:await s.findAll(req.query.activo)});}catch(e){next(e);}};
const findById=async(req,res,next)=>{try{res.json({success:true,data:await s.findById(Number(req.params.id))})}catch(e){next(e)}};
const update=async(req,res,next)=>{try{res.json({success:true,data:await s.update(Number(req.params.id),req.body)})}catch(e){next(e)}};
const remove=async(req,res,next)=>{try{await s.remove(Number(req.params.id),req.user.id);res.json({success:true,message:"Usuario eliminado"})}catch(e){next(e)}};
module.exports={create,findAll,findById,update,remove};
