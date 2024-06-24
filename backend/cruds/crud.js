const logSchema=require("../schemas/Loginschema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")




let registerLog=async(req,res)=>{
    const hass=await bcrypt.hash(req.body.password,7)
    const logData=logSchema({...req.body,password:hass})
    const saveData=await logData.save()
    res.json(saveData)
   
}
let logIn=async(req,res)=>{
    const userEmail=await logSchema.findOne({email:req.body.email})
    if(!userEmail)return res.json("Email not same")

    const userPassword=await bcrypt.compare(req.body.password,userEmail.password)
    if(!userPassword)return res.json("password wrong")
    const token=jwt.sign({id:userEmail._id},process.env.TOKEN,{expiresIn:'1hr'} )
    res.json({token})
    
}



module.exports={registerLog,logIn}