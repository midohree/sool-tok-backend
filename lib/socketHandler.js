const io = require('../configs/socket').getIo();

const clients = {};

io.on('connection', socket => {
  clients[socket.id] = socket.id;
  console.log('socket io : Client connected', clients);
  io.to(socket.id).emit('new socket id', { socketId: socket.id });

  socket.on('sendMessage', ({ text }) => {
    console.log('sendMessage :', text);
  });

  socket.on('disconnect', () => {
    delete clients[socket.id];
    console.log('socket io : Client disconnected', socket.id);
  });
});
