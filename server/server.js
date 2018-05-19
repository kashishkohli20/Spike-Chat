let {generateMessage, generateLocationMessage} = require('./utils/message');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const http = require('http');

const express = require('express');
const hbs = require('hbs');
const socketIO = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {			//server
	console.log('new user connected');

	socket.on('disconnect', () => {			//server
		console.log('user disconnected');
	});

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));					//client

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User just joined'));  //client

	socket.on('createMessage', (message, callback) => {		//server
		console.log('New Message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));//final way to emit messages-correct
		callback('This is from the server');																	//client

		// socket.broadcast.emit('newMessage', {		//broadcasting
		// 	from: message.from,										// everyone will see except you(the sender)
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});
});

server.listen(port, () => {
	console.log(`Starting the server on port ${port}`);
});
