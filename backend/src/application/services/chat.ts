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
          console.log('offer sent success')
          io.emit('offersent',offer)

        })
        socket.on('answer',(answer:RTCSessionDescriptionInit)=>{
          console.log('getting')
          io.emit('answersent',answer)
        })
        socket.on('ice',(candidate:RTCIceCandidate)=>{
          console.log('ice is triggering')
          io.emit('icesent',candidate)
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



  
  