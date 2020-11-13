const jwt = require('jsonwebtoken');

const { tokenSecretKey } = require('../../configs');
const User = require('../../models/User');

const googleLogin = async (req, res, next) => {
  const user = req.body;
  const { email, name, photoUrl } = user;

  if (!user) {
    return res.status(400).json({ result: 'error', message: 'Bad request' });
  }

  try {
    const targetUser = await User.findOne({ email });

    if (!targetUser) {
      const newUser = await User.create({
        email,
        name,
        photoUrl,
      });

      const token = jwt.sign({
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        photoUrl: newUser.photoUrl,
      }, tokenSecretKey);

      return res.status(201).json({ result: 'ok', token, user: newUser });
    }

    targetUser.isOnline = true;
    await targetUser.save();

    const token = jwt.sign({
      id: targetUser._id,
      email: targetUser.email,
      name: targetUser.name,
      photoUrl: targetUser.photoUrl,
    }, tokenSecretKey);

    res.status(200).json({ result: 'ok', token, user: targetUser });
  } catch (err) {
    console.log(err);
    res.status(401).json({ result: 'error', message: err.message });
  }
};

const tokenLogin = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ result: 'error', message: 'Bad request' });
  }

  try {
    const decodedUser = jwt.verify(token, tokenSecretKey);

    res.status(200).json({ result: 'ok', token, user: decodedUser });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ result: 'error', message: err.message });
  }
};

const logoutUser = async (req, res, next) => {
  const { user_Id } = req.params;

  try {
    const currentUser = await User.findById(user_Id);

    currentUser.isOnline = false;
    await currentUser.save();

    res.status(200).json({ result: 'ok' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ result: 'error', message: err.message });
  }
};

const getFriendList = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id);
    res.status(200).json({ result: 'ok', friendList: user.friendList });
  } catch (err) {
    return res.status(403).json({ result: 'error', message: 'Forbbiden' });
  }
};

module.exports = {
  googleLogin,
  tokenLogin,
  getFriendList,
  logoutUser,
};
