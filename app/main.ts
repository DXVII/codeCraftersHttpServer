import {Socket, createServer} from 'net';

import { handleGetRequests } from './getRequests';
import { handlePostRequests } from './postRequests';

const server = createServer((socket: Socket) => {
    socket.on('data',(data:Buffer) => {
      const request = data.toString()
      const requestVerb = request.split(' ')[0]
      
      if(requestVerb =="GET") handleGetRequests(socket,request);
      if(requestVerb =="POST") handlePostRequests(socket,request);
     
      socket.end();
  })
});

server.listen(4221, 'localhost', 
  () => console.log('Server is running on port 4221')
);











// import express from "express";

// const app = express()

// app.get('/', (req, res) => {
//   res.status(200).send("OK")
// });

// app.use(function(req, res, next) {
//   res.status(404).send('Not Found\r\n\r\n');
// });

// app.listen(4221,() => console.log("Listening on http://localhost:4221"));

