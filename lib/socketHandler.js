const io = require('../configs/socket').getIo();

const clients = {};
const rooms = {};

io.on('connection', socket => {
  socket.on('new user', ({ userId }) => {
    clients[socket.id] = userId;
    console.log('Clients :', clients);
  });

  socket.on('create room', ({ userId, roomData }) => {
    socket.join(userId);

    const newRoom = { ...roomData, createdBy: userId };
    rooms[userId] = newRoom;
    console.log('Rooms :', rooms);

    io.to(socket.id).emit('success create room', { newRoom });
  });

  socket.on('join room', ({ hostId }) => {
    const rooms = socket.rooms;

    if (hostId in rooms) {
      socket.join(hostId);
      io.to(socket.id).emit('success join room', { room: rooms[hostId] });
    }

    io.to(socket.id).emit('failure join room', { message: 'no room' });
  });

  socket.on('leave room', ({ userId }) => {
    // TODO: Leave Room
  });

  socket.on('disconnect', () => {
    delete clients[socket.id];
    console.log('Client disconnected :', socket.id);
  });
});
