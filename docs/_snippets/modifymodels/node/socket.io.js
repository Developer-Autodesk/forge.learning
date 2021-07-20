module.exports = (app) => {

    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    app.io = io;

    let clients = 0;
    io.on('connection', (socket) => {
        clients++;
        console.log('a client is connected');

        // Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
            clients--;
            console.log('a client disconnected');
        });
    });

    return ({
        http: http,
        io: io
    });
};
