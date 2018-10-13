const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const server = express()
const http = require('http').Server(server)
const io = require('socket.io')(http)
const data = {};

server.use(express.static(path.join(__dirname, 'public')))
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')
server.get('/', (req, res) => res.render('pages/index'))
server.get('/secretadminaaa', (req, res) => res.render('pages/admin'))

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on("answer", function(msg) {
    data[msg["id"]] = msg
    console.log(data)
    socket.broadcast.emit("update", data);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

http.listen(PORT, () => console.log(`Listening on ${ PORT }`))
