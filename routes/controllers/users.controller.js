const jwt = require('jsonwebtoken');

const { tokenSecretKey } = require('../../configs');
const User = require('../../models/User');

const postLogin = async (req, res, next) => {
  const user = req.body;
  const { email, name, photoUrl } = user;

  if (!user) {
    return res.status(400).json({ result: 'error', message: 'Bad request' });
  }

  try {
    const token = jwt.sign(user, tokenSecretKey);
    const targetUser = await User.findOne({ email });

    if (!targetUser) {
      const newUser = await User.create({
        email,
        name,
        photoUrl,
      });

      return res.status(201).json({ result: 'ok', token, user: newUser });
    }

    targetUser.isOnline = true;

    await targetUser.save();

    res.status(200).json({ result: 'ok', token, user: targetUser });
  } catch (err) {
    console.log(err);
    res.status(401).json({ result: 'error', message: err.message });
  }
};

module.exports = {
  postLogin,
};
