import { Socket } from "net";
import { writeSocketError, writeSocketSuccess201 } from "./helpers";
import { writeFileSync } from "fs";
export const handlePostRequests = (socket:Socket, request:string) => {
     const path = request.split(' ')[1];

     if(path.includes("/files/")) postPathFiles(socket,path);
     else writeSocketError


}

const postPathFiles = (socket:Socket,path:string) => {
     console.log(process.argv);
     const dir = process.argv[3];
     // const fileName = path.split("/files/")[1];
     // writeFileSync(dir+fileName,socket.read());
     writeSocketSuccess201(socket,"text/plain","");
}