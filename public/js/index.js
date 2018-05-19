let socket = io();

socket.on('connect', function() {			//client
	console.log('connected to server');
});

socket.on('disconnect', function() {			//received on client
	console.log('disconnected from server');
});

socket.on('newMessage', function(message) {		//received on client
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);

	// console.log('New Message', message);
	// let li = jQuery('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);
	//
	// jQuery('#messages').append(li);
	// jQuery('#message-form input').val('');
});

socket.on('newLocationMessage', function(message) {
	let formattedTime = moment(message.createAdd).format('h:mm a');
	let template = jQuery('#location-message-template').html();
	let html = Mustache.render(template, {
		url: message.url,
		text: 'My current location',
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);

	// let li = jQuery('<li></li>');
	// let a = jQuery('<a target="_blank">My current location</a>');
	// a.attr('href', message.url);
	// li.text(`${message.from} ${formattedTime}: `);
	// li.append(a);
	// jQuery('#messages').append(li);
});
// socket.emit('createMessage', {
// 	from: 'Frank',
// 	text: 'Hi!!'
// }, function(data) {
// 	console.log('Got it.', data);
// });

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	let messageTextBox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('');
	});
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location....');

	navigator.geolocation.getCurrentPosition(function(position){
		console.log(position);
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch location.');
	});
});
