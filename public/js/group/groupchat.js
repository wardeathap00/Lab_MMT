$(document).ready(function(){
	var socket = io();
	var room = $('#groupName').val();
	var sender = $('#sender').val();

	socket.on('connect', function(){
		console.log('User connected');

		var params = {
			room: room,
			name: sender
		}
		socket.emit('join', params, function(){
			console.log('User connect to this group');
		});
	});

	socket.on('usersList', function(users){
		var ol = $('<ol></ol>'); //list

		//loop để thêm user vào trong list trên view
		for(var i = 0; i < users.length; i++){
			ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+users[i]+'</a></p>'); //đổ vào tag myModal
		} 

		$(document).on('click', '#val', function(){
			$('#name').text('@'+$(this).text()); //lấy tên của 
			$('#receiverName').val($(this).text());
			$('#nameLink').attr("href", "#");
		});


		$('#numValue').text('('+users.length+')'); //hiện soos user
		$('#users').html(ol); 
	});

	socket.on('newMessage', function(data){
		var template = $('#message-template').html();
		var message = Mustache.render(template,{
			text: data.text,
			sender: data.from
		});

		$('#messages').append(message);

	});

	$('#message-form').on('submit', function(e){
		e.preventDefault();

		var msg = $('#msg').val();

		socket.emit('createMessage', {
			text: msg,
			room: room,
			sender: sender
		}, function(){
			$('#msg').val('');
		});

		$.ajax({
			url: '/group/'+room,
			type: 'POST',
			data: {
				message: msg,
				groupName: room
			},
			success: function(){
				$('#msg').val('');
			}
		});

	});


});