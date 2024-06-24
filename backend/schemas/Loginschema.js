const mongoose=require("mongoose")

const logSchema=mongoose.Schema({
    name:{type:String,
        required:true},
    email:{type:String,unique:true,
        required:true},
    password:{type:String,
        require:true}
})
module.exports=mongoose.model("log_coll",logSchema)