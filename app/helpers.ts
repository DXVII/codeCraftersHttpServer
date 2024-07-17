import { Socket } from 'net';

export const responseFormat = (status: string,contentType:string,suffix:string) => {
  const statusStr = `HTTP/1.1 ${status}\r\n`
  const contentTypeStr = `Content-Type: ${contentType}\r\n`
  const contentLength = `Content-Length: ${suffix.length}\r\n`
  return statusStr+contentTypeStr+contentLength+"\r\n"+suffix
};


export const writeSocketError = (socket:Socket) =>socket.write(responseFormat("404 Not Found","text/plain",""));
export const writeSocketSuccess200 = (socket:Socket,contentType:string,content:string) => socket.write(responseFormat("200 OK",contentType,content));
export const writeSocketSuccess201 = (socket:Socket,contentType:string,content:string) => socket.write(responseFormat("201 Created",contentType,content));