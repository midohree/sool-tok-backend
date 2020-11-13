const express = require('express');
const router = express.Router();

const userController = require('./controllers/users.controller');

router.post('/login/google', userController.googleLogin);
router.post('/login/token', userController.tokenLogin);

module.exports = router;
