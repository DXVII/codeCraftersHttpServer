import {Socket, createServer} from 'net';
import { readFileSync } from 'fs';

const server = createServer((socket: Socket) => {
    socket.on('data',(data:Buffer) => {
      const request = data.toString()
      const path = request.split(' ')[1];

      if(path === "/"){
        writeSocketSuccess(socket,"text/plain","");
      }

      else if(path.includes("/echo/")){
        const suffix = path.split("/echo/")[1];
        writeSocketSuccess(socket,"text/plain",suffix);
        
      } 
      
      else if(path.includes("/user-agent")){
        const userAgentContent = (request.split("User-Agent: ")[1]).replace("\r\n\r\n","");
        writeSocketSuccess(socket,"text/plain",userAgentContent);
      }

      else if(path.includes("/files/")){
        // console.log(process.argv); ==> [ "/usr/local/bin/bun", "/app/app/main.ts", "--directory", "/tmp/data/codecrafters.io/http-server-tester/"
        const dir = process.argv[3];
        const fileName = path.split("/files/")[1];
        try{
          const filecontent = readFileSync(dir+fileName).toString();
          writeSocketSuccess(socket,"application/octet-stream",filecontent);
        } catch{
          writeSocketError(socket);
        }
      }      
      else {
        writeSocketError(socket);
      }
      socket.end();
  })
});

server.listen(4221, 'localhost', 
  () => console.log('Server is running on port 4221')
);


const responseFormat = (status: string,contentType:string,suffix:string) => {
  const statusStr = `HTTP/1.1 ${status}\r\n`
  const contentTypeStr = `Content-Type: ${contentType}\r\n`
  const contentLength = `Content-Length: ${suffix.length}\r\n`
  return statusStr+contentTypeStr+contentLength+"\r\n"+suffix
};


const writeSocketError = (socket:Socket) =>socket.write(responseFormat("404 Not Found","text/plain",""));
const writeSocketSuccess = (socket:Socket,contentType:string,content:string) => socket.write(responseFormat("200 OK",contentType,content));



// import express from "express";

// const app = express()

// app.get('/', (req, res) => {
//   res.status(200).send("OK")
// });

// app.use(function(req, res, next) {
//   res.status(404).send('Not Found\r\n\r\n');
// });

// app.listen(4221,() => console.log("Listening on http://localhost:4221"));

