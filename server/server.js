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

	socket.emit('newEmail', {				//client
		from: 'mike@example.com',
		text: 'Hey! What\'s going on',
		createdAt: 123
	});

	socket.emit('newMessage', {		//client
		from: 'abc@example.com',
		text: 'aao beta aao',
		createdAt: 123
	});

	socket.on('createEmail', (newEmail) => {		//server
		console.log('New Email', newEmail);
	});

	socket.on('disconnect', () => {			//server
		console.log('user disconnected');
	});

	socket.on('createMessage', (message) => {
		console.log('New Message', message);
	});
});

server.listen(port, () => {
	console.log(`Starting the server on port ${port}`);
});
