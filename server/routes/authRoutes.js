const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const { secret, expiresIn } = require('../config/jwt.config');
const { route } = require('./booksRoutes');
const router = express.Router();

// User Registration
router.post('/register', asyncHandler(async (req, res) => {
    try {
        const { username, email, password, name } = req.body;

        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            name,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));

// User Login
router.post('/login', asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));


// Middleware for token verification
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
}

// Example protected route
router.get('/profile/:userId', verifyToken, async (req, res) => {
    try {
        const userId=req.params.userId;
        const user = await User.findById({_id: userId});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/user/authorized/:id', verifyToken, asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(req.params.id, { authorized: true }, { new: true }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(user);
    });
}));

router.delete('/users/:id', asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await User.deleteOne({ _id: id });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));


module.exports = router;

