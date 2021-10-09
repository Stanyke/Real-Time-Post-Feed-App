const {io} = require('./index');

io.on('connection', (socket) => {
    console.log('User just connected')
    
    socket.on('newPost', (data) => {
        socket.broadcast.emit('recieveNewPost', data);
    });

    socket.on('postAndAllComments', (data) => {
        socket.broadcast.emit('receivePostAndAllComments', data);
    })
});

module.exports = io;