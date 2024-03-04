import { io } from "../../app";
import { Socket } from "socket.io";


export const chatConnect = async()=>{
    io.on('connection',(socket:Socket)=>{
        console.log('user entered chat section')
        socket.on('chat',()=>{
          console.log('chat')
        })

        socket.on('onlive',(channel:string)=>{
          console.log(`a creator started live on ${channel} channel`)
          io.emit('live',channel)
        })
        socket.on('send',async(data)=>{
            const {message,userName,image} = data

            if(!message){
              io.emit('message',{userName,image})
            }else{
              io.emit('message',{message,userName,image})

            }
        })
      })
}



  
  