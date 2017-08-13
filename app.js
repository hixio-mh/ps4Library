const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

//mongodb connection
mongoose.connect('mongodb://localhost:27017/gamelibrary');
const db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//routes
const routes = require('./routes/index');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on Port: ${port}.`);
})