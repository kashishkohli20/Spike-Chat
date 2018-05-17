let socket = io();

socket.on('connect', function() {			//client
	console.log('connected to server');

	socket.emit('createEmail', {				//sent to server
		to: 'ramesh@suresh.com',
		text: 'Hey! this is donald this side.'
	});

	socket.emit('createMessage', {				//sent to server
		to: 'abcdef@example.com',
		text: 'hello i sent it from client to server'
	});

});

socket.on('disconnect', function() {			//received on client
	console.log('disconnected from server');
});

socket.on('newEmail', function(email) {		//received on client
	console.log('New Email', email);
});

socket.on('newMessage', function(message) {		//received on client
	console.log('New Message', message);
})
