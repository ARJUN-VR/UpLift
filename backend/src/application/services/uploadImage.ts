import cloudinary from "cloudinary"

export const uploadImage = async(imgUrl:string)=>{
    try{
      return await cloudinary.v2.uploader.upload(imgUrl)
    }catch(error){
      console.log(error,'error in image uplaoding usecase')
    }
  
  }
