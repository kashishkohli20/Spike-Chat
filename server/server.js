let {generateMessage, generateLocationMessage} = require('./utils/message');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const http = require('http');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const express = require('express');
const socketIO = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {			//server
	console.log('new user connected');

	socket.on('disconnect', () => {			//server
		let user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
		}
	});

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and Room name are required.');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));					//client
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has just joined the chat.`));  //client
		callback();
	});

	socket.on('createMessage', (message, callback) => {		//server
		console.log('New Message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));//final way to emit messages-correct
		callback('This is from the server');																	//client

	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});
});

server.listen(port, () => {
	console.log(`Starting the server on port ${port}`);
});
