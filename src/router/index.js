const express = require('express');
const user = require('./user');

const router = express.Router();

router.use('/users', user);

router.get('/', async (req, res) => {
    res.send('Api rodando!');
});

module.exports = router;