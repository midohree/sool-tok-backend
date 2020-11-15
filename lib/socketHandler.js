const { v4: uuidv4 } = require('uuid');
const io = require('../configs/socket').getIo();

const clients = {};
const rooms = {};

io.on('connection', socket => {
  socket.on('new user', ({ name }) => {
    clients[socket.id] = name;
    console.log('Current Clients :', clients);
  });

  socket.on('create room', ({ user, roomData }) => {
    const roomId = uuidv4();
    const newRoom = {
      ...roomData,
      memberList: [user],
      isLocked: false,
    };

    rooms[roomId] = newRoom;
    console.log('Current Rooms :', rooms);

    socket.join(roomId);
    io.to(socket.id).emit('success create room', { roomId, room: newRoom });
  });

  socket.on('join room', ({ roomId }) => {
    if (roomId in socket.rooms) {
      socket.join(roomId);
      io.to(socket.id).emit('success join room', { room: rooms[roomId] });
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
