import * as net from 'net';

const server = net.createServer(
  (socket) => {
    socket.on('data',(data)=>{
        const request = data.toString();
        console.log(request);
        // const path = request.split(' ')[1];
        // const response = path === '/' ? 'HTTP/1.1 200 OK\r\n\r\n' : 'HTTP/1.1 404 Not Found\r\n\r\n';
        socket.write("200");
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

