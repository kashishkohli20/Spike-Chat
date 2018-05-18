let socket = io();

socket.on('connect', function() {			//client
	console.log('connected to server');
});

socket.on('disconnect', function() {			//received on client
	console.log('disconnected from server');
});

socket.on('newMessage', function(message) {		//received on client
	console.log('New Message', message);
	let li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Frank',
// 	text: 'Hi!!'
// }, function(data) {
// 	console.log('Got it.', data);
// });

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	});
});
