import { io } from "../../app";
import { Socket } from "socket.io";

export const signaling = () => {
  const signalinghandler = (socket: Socket) => {
    console.log("signaling service started");
    socket.on("joinRequest", (channel: string) => {
      console.log(`creator has started a live room:${channel}`);
      io.emit("invite", channel);
    });

    socket.on('joined',()=>{
        io.emit('newjoin')
    })

    socket.on('call',(event)=>{
      io.emit('callSent',event)
    })

    socket.on('leave',()=>{
      io.emit('leaveSent')
    })

    socket.on('liveMessage',(data)=>{
      const {message,userName} = data
      io.emit('incoming',{message,userName})
    })


  };

  io.on("connection", signalinghandler);

  return () => {
    io.off("connection", signalinghandler);
  };
};
