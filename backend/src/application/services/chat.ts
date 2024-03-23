import { io } from "../../app";
import { Socket } from "socket.io";

export const chatConnect = async () => {
  const connectionHandler = (socket: Socket) => {
    try {

      socket.on('join',(room):void=>{

   
        socket.join(room)
        console.log('roomId:',room)

        io.to(room).emit('joined')
      })

      socket.on('message',(data):void=>{
        const {channel,message,userName,image,video } = data
        console.log('room:',channel)
        if(message){
          console.log('in the message');
          

          io.to(channel).emit('recieveMessage',{channel,message,userName})

        }else if(video){
          console.log('works');
          
          io.to(channel).emit('recieveMessage',{channel,userName,video})
        }else if(image){
          io.to(channel).emit('recieveMessage',{channel,userName,image})
        }

      })

      socket.on('typing',(data):void=>{

        const {userName,campaignId:channel} = data
        console.log('typing:',userName,channel)
        socket.broadcast.to(channel).emit('isTyping',userName)
        

      })

      socket.on('ended',(data):void=>{
        const {campaignId:channel} = data
        socket.broadcast.to(channel).emit('typingEnded')
      })
     

    } catch (error) {
      console.log(error);
    }
  };

  io.on("connection", connectionHandler);

  return () => {
    io.off("connection", connectionHandler);
  };
};
