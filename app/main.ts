import {Socket, createServer} from 'net';
const responseFormat = (s: string) => `HTTP/1.1 ${s}\r\n\r\n`;

const server = createServer((socket: Socket) => {
    socket.on('data',(data:Buffer) => {
      const path = data.toString().split(' ')[1];
      socket.write((path =="/") ? responseFormat("200 OK"):responseFormat("404 Not Found"));
      socket.end();
  })
});
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
// Uncomment this to pass the first stage
server.listen(4221, 'localhost', () => {
    console.log('Server is running on port 4221');
});


// import express from "express";

// const app = express()

// app.get('/', (req, res) => {
//   res.status(200).send("OK")
// });

// app.use(function(req, res, next) {
//   res.status(404).send('Not Found\r\n\r\n');
// });

// app.listen(4221,() => console.log("Listening on http://localhost:4221"));

