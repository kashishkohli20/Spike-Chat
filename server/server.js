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


	socket.emit('newMessage', {
		from: 'admin@admin.com',
		text: 'welcome to the chat',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from: 'admin@admin.com',
		text: 'new user just joined',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (message) => {		//server
		console.log('New Message', message);
		io.emit('newMessage', {					//final way to emit messages-correct
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});																//client

		// socket.broadcast.emit('newMessage', {		//broadcasting
		// 	from: message.from,										// everyone will see except you(the sender)
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});
});

server.listen(port, () => {
	console.log(`Starting the server on port ${port}`);
});
