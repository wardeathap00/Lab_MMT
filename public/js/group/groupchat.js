$(document).ready(function(){
    var socket = io();

    socket.on('connect', function(){
        console.log('bla bal connection');
        
    });
    
});