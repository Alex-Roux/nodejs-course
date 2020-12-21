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


// PAGES

// Root page
app.get('/', (req,res) => {
    res.redirect('/blogs');
});

// List all blogs (root)
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => { res.render('index', { title: "Home", blogs: result }); })
        .catch((err) => { console.log(err); });
});

// Post a blog
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then(result => { res.redirect('blogs') }).catch((err) => { console.log(err)});
});

//Get a post's details
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', { blog: result, title: 'Blog details'})
    })
    .catch(err => {console.log(err)}); 
    
});

// Delete a blog
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => { res.json({ redirect: '/blogs'}) })
    .catch(err => { console.log(err) });
})

// About
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// New blog
app.get('/newblog', (req, res) => {
    res.render('newblog', { title: "Create a new blog" });
});

// 404, must be at the bottom
app.use((req, res) => {
    res.render('404', { title: "404" });
});

