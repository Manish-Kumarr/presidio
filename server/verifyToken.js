const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated!' });
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is not valid!' });
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  // console.log(req.params);
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId) {
      next();
    } else {
      return res.status(403).json({ message: 'You are not authorized!' });
    }
  });
};

const verifySeller = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user.isSeller);
    if (req.user.isSeller) {
      next();
    } else {
      return res.status(403).json({ message: 'You are not authorized!' });
    }
  });
};

module.exports = { verifyToken, verifyUser, verifySeller };
