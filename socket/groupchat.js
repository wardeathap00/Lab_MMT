const { text } = require("body-parser");
const User = require("../helpers/User");
module.exports = function(io, Users){

    const users =  new Users();

    io.on('connect', (socket) => {
        console.log('bla bla');
        
        socket.on('join', (params, callback) => {
            socket.join(params.room);
            console.log( "param" + params.name);
            
            users.AddUserData(socket.id, params.name, params.room);
            console.log(users);
            

            callback();
        });

        socket.on('createMessage', (message, callback) => {
            console.log(message);

            io.to(message.room).emit('newMessage',  {
                text : message.text,
                room : message.room,
                from : message.sender,
            });

            callback();
        });
    });
}