const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.json({ msg: 'No user existing' });

    res.json(user);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('server error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // see if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Angaben sind ungültig' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Angaben sind ungültig' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
    // return JWT
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
