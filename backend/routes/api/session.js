// routes/session.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.user === null) {
    res.json({ user: null });
  } else {
    res.json({
      user: {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        username: req.user.username,
      }
    });
  }
});

module.exports = router;
