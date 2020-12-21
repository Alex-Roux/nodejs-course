const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const fs = require('fs');

// MongoDB
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
const dbURI = config.dbURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("Connected to db.");
    app.listen(3001)
});


// create the app
const app = express();


// register view engine
app.set('view engine', 'ejs');
app.set('views', 'htdocs');


// listen for requests
app.listen(3000);


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



// 404, must be at the bottom
app.use((req, res) => {
    res.render('404', { title: "404" });
});

