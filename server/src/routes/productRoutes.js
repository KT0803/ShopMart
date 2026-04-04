const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get all products route');
});

router.get('/:id', (req, res) => {
  res.send('Get product by ID route');
});

router.post('/', (req, res) => {
  res.send('Create product route');
});

router.put('/:id', (req, res) => {
  res.send('Update product route');
});

router.delete('/:id', (req, res) => {
  res.send('Delete product route');
});

module.exports = router;
