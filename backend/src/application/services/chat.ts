import { io } from "../../app";
import { Socket } from "socket.io";

export const chatConnect = async () => {

  const connectionHandler = (socket: Socket) => {
      console.log('user entered chat section');   
      socket.on('chat', () => {
          console.log('chat');
      });
      socket.on('send', async (data) => {
        console.log('getting the call')
          const { message, userName, image, video, channel } = data;
          console.log('video:',video,userName)

          socket.join(channel);

          if (!message) {
              io.to(channel).emit('message', { userName, image });
          }else if(!message&&!image){
            io.to(channel).emit('message',{userName,video})
          } else if(video&&!image){
            io.to(channel).emit('message',{userName,video,message})
            } else {
              io.to(channel).emit('message', { message, userName, image });
          }
      });
  };

  io.on('connection', connectionHandler);


  return () => {
    
      io.off('connection', connectionHandler); 
  };
};




  
  