const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const useralreadyregister = await User.findOne({ email });
        if (useralreadyregister) {
             return res.status(400).json({ message: "user already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "user registered successfully" });

    } catch (err) {
         res.status(500).json({ message: "error at time of registration", error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid credentials" });
        }

         const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        const payload = {
            id: user._id,
            username: user.username
        };
        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
            }
        );

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;