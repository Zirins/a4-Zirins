const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
    try {
        const user = await User.register(new User({ username: req.body.username }), req.body.password);
        res.json({ message: "User registered", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: "Logged in", user: req.user });
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout(() => res.json({ message: "Logged out" }));
});

// Auth
router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ status: "authenticated", user: req.user });
    } else {
        res.json({ status: "not authenticated" });
    }
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;