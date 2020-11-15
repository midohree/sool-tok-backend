const jwt = require('jsonwebtoken');

const { tokenSecretKey } = require('../../configs');

exports.verifyToken = (req, res, next) => {
  const { user_id } = req.params;
  const token = req.headers['jwt-token'];

  try {
    const decodedUser = jwt.verify(token, tokenSecretKey);
    if (decodedUser._id !== user_id) {
      return res.status(403).json({ result: 'error', error: 'Mismatch user id' });
    }
    next();
  } catch (err) {
    console.log('err', err);
    res.status(401).json({ result: 'error', error: err.message });
  }
};
