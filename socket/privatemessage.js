// const fs = require('fs');

// const imgFile = fs.readFileSync(filePath);
// const imgBase64 = new Buffer(imgFile).toString('base64');



module.exports = function(io){

    io.on('connection', (socket) => {
        socket.on('join PM', (pm) => {
            socket.join(pm.room1);
            socket.join(pm.room2);
        });
        socket.on('private message', (message, callback) => {
            io.to(message.room).emit('new message', {
                text: message.text,
                sender: message.sender
            });

            io.emit('message display', {});

            callback();
        });

        socket.on('refresh', function(){
            io.emit('new refresh', {});
        });

        // socket.on('img', (data) => {
            
        //   });
    });

}