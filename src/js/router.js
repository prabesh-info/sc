const { v4: uuidv4 } = require('uuid');
let posts = []; // Temporary in-memory storage for posts

// Get all posts
exports.getAllPosts = (req, res) => {
    res.json(posts);
};

// Get a single post by ID
exports.getPostById = (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
};

// Create a new post
exports.createPost = (req, res) => {
    const newPost = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        date: new Date()
    };
    posts.push(newPost);
    res.status(201).json(newPost);
};

// Update a post by ID
exports.updatePost = (req, res) => {
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        posts[index] = {
            ...posts[index],
            ...req.body
        };
        res.json(posts[index]);
    } else {
        res.status(404).send('Post not found');
    }
};

// Delete a post by ID
exports.deletePost = (req, res) => {
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        const deletedPost = posts.splice(index, 1);
        res.json(deletedPost);
    } else {
        res.status(404).send('Post not found');
    }
};