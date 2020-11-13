const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const { user_id } = req.params;
  const token = req.header['jwt-token'];

  try {
    const decodedUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log(decodedUser.id, user_id);
    if (decodedUser.id !== user_id) throw new Error('Mismatch user id');
    next();
  } catch (err) {
    res.status(401).json({ result: 'error', error: err.message });
  }
};
