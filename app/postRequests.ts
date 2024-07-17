import { Socket } from "net";
import { writeSocketError, writeSocketSuccess201 } from "./helpers";
import { writeFileSync } from "fs";
export const handlePostRequests = (socket:Socket, request:string) => {
     const path = request.split(' ')[1];


     if(path.includes("/files/")) postPathFiles(socket,request);
     else writeSocketError


}

const postPathFiles = (socket:Socket,request:string) => {
     const dir = process.argv[3];
     
     const path = request.split(' ')[1];
     const fileName = path.split("/files/")[1];
     const requestLineSplit = request.split('\r\n');
     const contentBody = requestLineSplit[requestLineSplit.length-1];

     try {
          writeFileSync(dir+fileName,contentBody);
          writeSocketSuccess201(socket,"text/plain","");
     } catch {
          writeSocketError(socket)
     }
     
}