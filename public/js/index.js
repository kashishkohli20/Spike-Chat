let socket = io();

socket.on('connect', function() {			//client
	console.log('connected to server');
});

socket.on('disconnect', function() {			//received on client
	console.log('disconnected from server');
});

socket.on('newMessage', function(message) {		//received on client
	console.log('New Message', message);
})
