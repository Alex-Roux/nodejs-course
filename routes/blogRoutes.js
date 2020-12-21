const express = resquire('express');
const router = express.router();


// PAGES

// Root page
router.get('/', (req,res) => {
    res.redirect('/blogs');
});

// List all blogs (root)
router.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => { res.render('index', { title: "Home", blogs: result }); })
        .catch((err) => { console.log(err); });
});

// Post a blog
router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then(result => { res.redirect('blogs') }).catch((err) => { console.log(err)});
});

//Get a post's details
router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', { blog: result, title: 'Blog details'})
    })
    .catch(err => {console.log(err)}); 
    
});

// Delete a blog
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => { res.json({ redirect: '/blogs'}) })
    .catch(err => { console.log(err) });
})

// About
router.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// New blog
router.get('/newblog', (req, res) => {
    res.render('newblog', { title: "Create a new blog" });
});
