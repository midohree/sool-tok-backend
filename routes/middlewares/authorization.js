const jwt = require('jsonwebtoken');

const { tokenSecretKey } = require('../../configs');

exports.verifyToken = (req, res, next) => {
  const { user_id } = req.params;
  const token = req.header['jwt-token'];

  try {
    const decodedUser = jwt.verify(token, tokenSecretKey);
    console.log(decodedUser.id, user_id);
    if (decodedUser.id !== user_id) {
      return res.status(403).json({ result: 'error', error: 'Mismatch user id' });
    }
    next();
  } catch (err) {
    res.status(401).json({ result: 'error', error: err.message });
  }
};
