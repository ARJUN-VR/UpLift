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
        const {channel } = data
        console.log('room:',channel)
        io.to(channel).emit('Rmessage',channel)

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
