const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // see if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errors: [{ msg: 'Nutzer existiert bereits' }]
      });
    }

    user = new User({
      name,
      email,
      password
    });

    // encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // return JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.updateUserData = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
