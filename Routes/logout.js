const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    // Clear token from client-side storage 
    res.clearCookie('token'); // In case cookies are used to store tokens
    return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
