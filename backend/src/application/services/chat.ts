import { io } from "../../app";
import { Socket } from "socket.io";


export const chatConnect = async()=>{
    io.on('connection',(socket:Socket)=>{
        console.log('user entered chat section')
        socket.on('chat',()=>{
          console.log('chat')
        })
        socket.on('send',async(data)=>{
            const {message,userName,image,channel} = data

            socket.join(channel)

            if(!message){
              io.to(channel).emit('message',{userName,image})
            }else{
              io.to(channel).emit('message',{message,userName,image})

            }
        })
      })
}



  
  