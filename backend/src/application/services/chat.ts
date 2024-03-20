import { io } from "../../app";
import { Socket } from "socket.io";

export const chatConnect = async () => {
  const connectionHandler = (socket: Socket) => {
    try {
     
      socket.on('reqIn',(data)=>{
        const {email,id:channel} = data
        socket.join(channel)
        console.log('works')
        const roomSockets = io.sockets.adapter.rooms.get(channel);
        console.log(roomSockets);
        io.to(channel).emit('res',email)
      })

      socket.on("send", (data) => {
        const { message, userName, image, video, channel } = data;

        const roomSockets = io.sockets.adapter.rooms.get(channel);
        console.log(roomSockets);

        socket.join(channel)

    
        if (!message) {
          io.to(channel).emit("message", { userName, image });
          console.log('a')

        } else if (!message && !image) {
          io.to(channel).emit("message", { userName, video });
          console.log('b')

        } else if (video && !image) {
          io.to(channel).emit("message", { userName, video, message });
          console.log('c')

        } else {
          io.to(channel).emit("message", { message, userName, image });
          console.log('d')

        }
      });
      socket.on("typing", (channel, userName) => {
        console.log("getting the typing event", channel, userName);
        io.to(channel).emit("isTyping", userName);
      });
    } catch (error) {
      console.log(error);
    }
  };

  io.on("connection", connectionHandler);

  return () => {
    io.off("connection", connectionHandler);
  };
};
