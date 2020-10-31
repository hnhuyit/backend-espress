var express = require('express')
var router = express.Router();
var Post = require('../models/post')
// var Product = require('../controllers/product')


router.get('/', async (req, res) => {

    const posts = await Post.find({})
    res.render('posts.index', {
        posts
    })
})

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('posts.post', {
        post
    })
});

router.get('/new', (req, res) => {
    console.log(111)
    res.render('posts.create')
});

router.post('/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })
});


module.exports = router