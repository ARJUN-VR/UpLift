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
          io.emit('invite',channel)
        })

        socket.on('joined',()=>{
          io.emit('newjoin')
        })
        socket.on('offer',(offer:RTCSessionDescriptionInit)=>{
          io.emit('offersent',offer)

        })
        socket.on('answer',(answer:RTCSessionDescriptionInit)=>{
          io.emit('answersent',answer)
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



  
  