const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const PropertyModel = require('../models/Property.model');

const signup = async (req, res) => {
  const { firstname, lastname, email, password, phone, isSeller } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error' });
  }
  if (existingUser) {
    return res.status(400).json({ message: 'User Already Exists!' });
  }
  if (firstname.length < 2) {
    return res.status(400).json({ message: 'Name Min length 2!' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password Min length 6!' });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    phone,
    isSeller,
  });

  try {
    await newUser.save();
  } catch (err) {
    return res.status(500).json({ message: 'Server Error!' });
  }
  return res.status(201).json({ message: 'User Created!' });
};

const login = async (req, res) => {
  const { email, pass } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return res.status(404).json({ message: 'Server Error!' });
  }
  if (!existingUser) res.status(400).json({ message: 'Wrong Credentials!' });
  const isPasswordCorrect = await bcrypt.compare(pass, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Wrong Credentials!' });
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
      email: existingUser.email,
      isSeller: existingUser.isSeller,
    },
    process.env.JWT
  );

  const { password, ...others } = existingUser._doc;

  return res
    .status(200)
    .cookie('access_token', token, {
      httpOnly: true,
      secure: true,
    })
    .json({ user: others, message: 'Login Successful', token });
};

const userProperties = async (req, res) => {
  try {
    const userId = req.params.userId;
    const properties = await PropertyModel.find({ owner: userId });
    res.json(properties);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { signup, login, userProperties };
