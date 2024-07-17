
import { readFileSync } from 'fs';
import { Socket } from 'net';

import { writeSocketError, writeSocketSuccess200 } from './helpers';

export const handleGetRequests = (socket:Socket,request:string) => {
    const path = request.split(' ')[1];
    
    if(path === "/") getPathEmpty(socket);

      else if(path.includes("/echo/")) getPathEcho(socket,path)
      
      else if(path.includes("/user-agent")) getPathUserAgent(socket,request);

      else if(path.includes("/files/")) getPathFiles(socket,path)
              
      else writeSocketError(socket);
      
}

const getPathEmpty = (socket:Socket) => writeSocketSuccess200(socket,"text/plain","");
    
const getPathEcho = (socket:Socket,path:string) => {
    const suffix = path.split("/echo/")[1];
    writeSocketSuccess200(socket,"text/plain",suffix);
} 
const getPathUserAgent = (socket:Socket,request:string) => {
    const userAgentContent = (request.split("User-Agent: ")[1]).replace("\r\n\r\n","");
    writeSocketSuccess200(socket,"text/plain",userAgentContent);

}
const getPathFiles = (socket:Socket,path:string) => {
    // console.log(process.argv); ==> [ "/usr/local/bin/bun", "/app/app/main.ts", "--directory", "/tmp/data/codecrafters.io/http-server-tester/"
    const dir = process.argv[3];
    const fileName = path.split("/files/")[1];
    try{
        const filecontent = readFileSync(dir+fileName).toString();
        writeSocketSuccess200(socket,"application/octet-stream",filecontent);
    } catch{
        writeSocketError(socket);
    }
}
