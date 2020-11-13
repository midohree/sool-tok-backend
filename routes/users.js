const express = require('express');
const router = express.Router();

const userController = require('./controllers/users.controller');
const { verifyToken } = require('./middlewares/authorization');

router.post('/login/google', userController.googleLogin);
router.post('/login/token', userController.tokenLogin);
router.post('/:user_id/logout', verifyToken, userController.logoutUser);
router.get('/:user_id/friends', verifyToken, userController.getFriendList);

module.exports = router;
