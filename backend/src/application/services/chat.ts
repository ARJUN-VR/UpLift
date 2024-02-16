import { io } from "../../app";
import { Socket } from "socket.io";
import { uploadImage } from "./uploadImage";
import { UploadApiResponse } from "cloudinary";

export const chatConnect = async()=>{
    io.on('connection',(socket:Socket)=>{
        console.log('user entered chat section')
        socket.on('chat',()=>{
          console.log('chat')
        })
        socket.on('send',async(data)=>{
            const {message,userName,image} = data
            let imageUrl:string|undefined;
            if(image){
                try{
                   const  res = await uploadImage(image)
                   imageUrl = res?.secure_url
                }catch(error){
                    console.log(error)
                }
            }
          io.emit('message',{message,userName,imageUrl})
        
        })
      })
}



  
  