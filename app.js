const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const Blog = require('../models/blog');
const fs = require('fs');


const routes = require('./routes/blogRoutes.js');

// MongoDB
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("Connected to db.");
    app.listen(3000);
});


// create the app
const app = express();


// register view engine
app.set('view engine', 'ejs');
app.set('views', 'htdocs');


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', routes);

// 404
app.use((req, res) => {
    res.statusCode = 404;
    res.render('404', { title: "404" });
});

