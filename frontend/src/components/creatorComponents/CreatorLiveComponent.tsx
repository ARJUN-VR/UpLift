import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export const CreatorLiveComponent = () => {
 

  return (
    <div className="bg-gray-900 flex flex-col">
      
    </div>
  );
};
