const express = require('express');

const router = express.Router();

router.post('/create', (req, res) => {
  res.send('Create order route');
});

router.get('/user', (req, res) => {
  res.send('Get user orders route');
});

module.exports = router;
