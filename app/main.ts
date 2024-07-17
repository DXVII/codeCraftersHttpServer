import {Socket, createServer} from 'net';

const responseFormat = (status: string,suffix:string) => {
  const statusStr = `HTTP/1.1 ${status}\r\n`
  const contentType = `Content-Type: text/plain\r\n`
  const contentLength = `Content-Length: ${suffix.length}\r\n`
  return statusStr+contentType+contentLength+"\r\n"+suffix
};

const server = createServer((socket: Socket) => {
    socket.on('data',(data:Buffer) => {
      const path = data.toString().split(' ')[1];
      if(path === "/"){
        socket.write(responseFormat("200 OK",""));
      }
      else if(path.includes("/echo/")){
        const suffix = path.split("/echo/")[1];
        socket.write(responseFormat("200 OK",suffix));
      } else {
        socket.write(responseFormat("404 Not Found",""));
      }
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

