import { Server } from "socket.io";

export const emitEventToClient = (io:Server,event:string,data:any) =>{
    io.emit(event,data)
}