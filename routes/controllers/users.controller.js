const jwt = require('jsonwebtoken');

const { tokenSecretKey } = require('../../configs');
const User = require('../../models/User');

const postLogin = async (req, res, next) => {
  const user = req.body;
  const { email, displayName, photoUrl } = user;

  if(!user) {
    return res.status(400).json({ result: 'error', message: 'Bad request' });
  }

  try {
    const token = jwt.sign(user, tokenSecretKey);
    const targetUser = await User.findOne({ email: email });

    if(!targetUser) {
      const newUser = await User.create({
        email: email,
        name: displayName,
        photoUrl: photoUrl,
      });

      return res.status(201).json({ result: 'ok', token, user: newUser });
    }

    res.status(200).json({ result: 'ok', token, user: targetUser });
  } catch (err) {
    console.log(err);
    res.status(401).json({ result: 'error', message: err.message });
  }
};

module.exports = {
  postLogin,
};
