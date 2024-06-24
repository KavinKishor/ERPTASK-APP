const mongoose=require("mongoose")


const imgSchema=new mongoose.Schema({
   imageUrl:String
})
const Stuimages=mongoose.model("image_coll",imgSchema)



const getStuImgs=async(req,res)=>{
    try{
        const imagesData=await Stuimages.find()
        res.json(imagesData)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}



const postStuImgs=async(req,res)=> {
    try {
        const imageUrl = req.file ? req.file.filename: null;
        const newImg=new Stuimages({imageUrl}) 
        await newImg.save()
        res.json(newImg).status(201)
    } catch (error) {
        res.json(error)
    }
}

const putStuImgs=async(req,res)=>{
    try {
        const imgUrl=req.file ? req.file.filename:null
        const updateImg=await Stuimages.findByIdAndUpdate(req.params.id,{imgUrl},{new:true})
        res.json({update:updateImg,msg:"image updated"})
    } catch (error) {
        res.json(error)
    }
}

const deleteStuImgs=async(req,res)=>{
    try {
        const delImg=await Stuimages.findByIdAndDelete(req.params.id)
        res.json({delted:delImg,mas:"image deleted"})
    } catch (error) {
        res.json(error)
    }
}
module.exports={deleteStuImgs,putStuImgs,getStuImgs,postStuImgs}
