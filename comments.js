// Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
const port = 8080;
const hostname = 'r
// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const comments = require('./routes/comments');

// Create web server
const app = express();

// Install middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Create routes
app.use('/comments', comments);

// Start the server
app.listen(process.env.PORT || 8081);
