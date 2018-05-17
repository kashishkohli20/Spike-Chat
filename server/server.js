const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
const hbs = require('hbs');

let app = express();
app.use(express.static(publicPath));

app.listen(3000, () => {
	console.log('Starting the server on port 3000');
});
