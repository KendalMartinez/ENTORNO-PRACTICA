const s=require("./reporte.service");const resumen=async(req,res,next)=>{try{res.json({success:true,data:await s.resumen()})}catch(e){next(e)}};module.exports={resumen};
