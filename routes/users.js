const express = require('express');
const router = express.Router();

const userController = require('./controllers/users.controller');

router.post('/login', userController.postLogin);

module.exports = router;
