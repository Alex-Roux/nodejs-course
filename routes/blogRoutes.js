const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController");



console.log('ok')
// PAGES

// Root page
router.get('/', blogController.blog_index);
// Post a blog
router.post('/blogs', blogController.blog_create_post);
//Get a post's details
router.get('/blogs/:id', blogController.blog_details);
// Delete a blog
router.delete('/blogs/:id', blogController.blog_delete);
// New blog
router.get('/newblog', blogController.blog_create_get);

// About
router.get('/about', (req, res) => {
    res.render('./blogs/about', { title: "About" });
});
module.exports = router;