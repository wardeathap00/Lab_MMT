//const { template } = require("lodash");

$(document).ready(function(){
    var socket = io();

    var room = $('#groupName').val();

    var sender = $('#sender').val();

    socket.on('connect', function(){
        console.log('bla bal connection');
        
        var params = {
            room: room,
            name: sender, 
        }

        socket.emit('join', params, function(){
            console.log('user joined room '  + params.room + params.name);
            

        });
    });

    socket.on('newMessage', function(data) {    
        console.log(data);
         var template = $('#message-template').html();
         var message = Mustache.render(template, {
            text: data.text,
            sender: data.form,
         });

         $('#messages').append(message);
    });

    $('#message-form').on('submit', function(e){
        e.preventDefault();
        
        var msg = $('#msg').val();

        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender,
        }, function(){
            $('#msg').val('');
        });
    })
    
});