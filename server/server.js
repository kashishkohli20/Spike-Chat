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

	socket.on('createMessage', (message) => {		//server
		console.log('New Message', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});																//client
	});
});

server.listen(port, () => {
	console.log(`Starting the server on port ${port}`);
});
