import { io } from "../../app";
import { Socket } from "socket.io";

export const chatConnect = async () => {
  // Establish connection and set up event listeners
  const connectionHandler = (socket: Socket) => {
      console.log('user entered chat section');
      // Add event listeners
      socket.on('chat', () => {
          console.log('chat');
      });
      socket.on('send', async (data) => {
          const { message, userName, image, channel } = data;

          socket.join(channel);

          if (!message) {
              io.to(channel).emit('message', { userName, image });
          } else {
              io.to(channel).emit('message', { message, userName, image });
          }
      });
  };

  io.on('connection', connectionHandler);

  // Return a cleanup function
  return () => {
      // Clean up event listeners or any other resources if necessary
      io.off('connection', connectionHandler); // This removes the specific 'connection' event listener
  };
};




  
  