const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');  
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

 
router.post('/', auth, async (req, res) => {
    try {
    const { caption,image } = req.body;
        const newPost = new Post({
            caption,
            image,
            owner: req.user.id , 
        });
const post = await newPost.save();
        res.json(post);

    } catch (err) {
         res.status(500).send('Server Error');
    }
});

router.get('/feed', auth, async (req, res) => {
    try {
         const currentUser = await User.findById(req.user.id);
        const userPosts = await Post.find({ owner: { $in: currentUser.following } })
            .populate('owner', ['username', 'profilePic']) 
            .sort({ createdAt: -1 });  
        res.json(userPosts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
         if (post.likes.includes(req.user.id)) {
             await post.updateOne({ $pull: { likes: req.user.id } });
            res.status(200).json("The post has been unliked");
        } else {
             await post.updateOne({ $push: { likes: req.user.id } });
            res.status(200).json("The post has been liked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
 
router.post('/comment/:id', auth, async (req, res) => {
    try {
         const newComment = new Comment({
            text: req.body.text,
            owner: req.user.id,
            post: req.params.id
        });
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});
 
router.get('/comments/:id', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id })
            .populate('owner', 'username profilePic') 
            .sort({ createdAt: -1 });  
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

 
router.get('/user/:id', auth, async (req, res) => {
    try {
        const posts = await Post.find({ owner: req.params.id })
            .populate('owner', ['username', 'profilePic'])
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('owner', ['username', 'profilePic']);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;