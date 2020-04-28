const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(userController.registerUser)
  .put(auth, userController.updateUserData);

module.exports = router;
