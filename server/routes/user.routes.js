const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  userProperties,
} = require('../controller/user.controller');
const { verifyUser } = require('../verifyToken');

router.post('/signup', signup);
router.post('/login', login);
router.get('/:userId/properties', userProperties);

module.exports = router;
