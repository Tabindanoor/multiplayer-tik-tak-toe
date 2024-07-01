import { io } from "socket.io-client";

const socketOptions = {
    reconnection: true,             // Enable automatic reconnection
    reconnectionAttempts: Infinity, // Number of reconnection attempts before giving up
    reconnectionDelay: 1000,        // Delay between reconnection attempts in milliseconds
    reconnectionDelayMax: 5000,     // Maximum delay between reconnection attempts in milliseconds
    timeout: 20000,                 // Timeout before disconnecting if connection cannot be established
    autoConnect: true,              // Automatically connect to the server
    transports: ['websocket'],      // Transport mechanism to be used (default is ['polling', 'websocket'])
    // Add any other options you need here
  };

  export const socket = io('http://localhost:3000', socketOptions); // Replace with your server URL
