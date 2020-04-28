const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(auth, authController.getCurrentUser)
  .post(authController.loginUser);

module.exports = router;
