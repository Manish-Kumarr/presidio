const express = require('express');
const router = express.Router();
const {
  addProperty,
  updateProperty,
  deleteProperty,
  allProperty,
  getPropertyById,
} = require('../controller/property.controller');
const { verifyUser, verifySeller } = require('../verifyToken');

router.get('/', allProperty);
router.get('/:id', getPropertyById);
router.post('/', addProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
