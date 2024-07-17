import express from "express";

const app = express()

app.get('/', (req, res) => {
  res.status(200).send("OK")
});

app.use(function(req, res, next) {
  res.status(404).send('Not Found\r\n\r\n');
});

app.listen(4221,() => console.log("Listening on http://localhost:4221"));

// import * as net from "net";
// Uncomment this to pass the first stage
// const server = net.createServer((socket) => {
//   socket.write("HTTP/1.1 200 OK\r\n\r\n")
//   socket.on("close", () => {
//     socket.end();
//   });
// });