import { io } from "../../app";
import { Socket } from "socket.io";


export const chatConnect = async()=>{
    io.on('connection',(socket:Socket)=>{
        console.log('user entered chat section')
        socket.on('chat',()=>{
          console.log('chat')
        })

        socket.on('joinRequest',(channel:string)=>{
          console.log(`a creator started live on ${channel} channel check`)
          io.emit('test',channel)
        })
        socket.on('send',async(data)=>{
            const {message,userName,image,campaignId} = data

            socket.join(campaignId)

            if(!message){
              io.to(campaignId).emit('message',{userName,image})
            }else{
              io.to(campaignId).emit('message',{message,userName,image})

            }
        })
      })
}



  
  