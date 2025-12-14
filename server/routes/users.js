const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

 router.get('/search', auth, async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ message: "Username query is required" });
    }

    try {
        const users = await User.find({
            username: { $regex: username, $options: 'i' }  
        }).select('username profilePic');  
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});
 
router.put('/follow/:id', auth, async (req, res) => {
     if (req.user.id === req.params.id) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    try {
         const currentUser = await User.findById(req.user.id);
        const userToFollow = await User.findById(req.params.id);
    if (!userToFollow.followers.includes(req.user.id)) {
            await userToFollow.updateOne({ $push: { followers: req.user.id } });
            await currentUser.updateOne({ $push: { following: req.params.id } });
            
            res.status(200).json({ message: "User has been followed" });
        } else {
            res.status(403).json({ message: "You already follow this user" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



router.put('/unfollow/:id', auth, async (req, res) => {
    if (req.user.id === req.params.id) {
        return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    try {
        const currentUser = await User.findById(req.user.id);
        const userToFollow = await User.findById(req.params.id);
        if (userToFollow.followers.includes(req.user.id)) {
            await userToFollow.updateOne({ $pull: { followers: req.user.id } });
            await currentUser.updateOne({ $pull: { following: req.params.id } });
            
            res.status(200).json({ message: "User has been unfollowed" });
        } else {
            res.status(403).json({ message: "You don't follow this user" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

 router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;