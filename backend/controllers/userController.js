const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const Users = db.users;

const addNewUser = async (req, res) => {
  const { Login, Email, Password } = req.body;

  try {
    const existingUserByLogin = await Users.findOne({ where: { Login } });
    if (existingUserByLogin) {
      return res.status(400).json({ message: 'Login is already taken.' });
    }
    const existingUserByEmail = await Users.findOne({ where: { Email } });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = await Users.create({
      Login,
      Email,
      Password : hashedPassword,
    });

    return res.status(201).json({
      message: 'User registered successfully!',
      user: { id: newUser.ID, login: newUser.Login, email: newUser.Email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const loginUser = async (req, res) => {
    const { Login, Password } = req.body;
    try {
      const user = await Users.findOne({ where: { Login } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid login or password.' });
      }
  
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid login or password.' });
      }
      return res.status(200).json({
        message: 'Login successful!',
        user: { id: user.ID, login: user.Login, email: user.Email },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { 
    addNewUser,
    loginUser,
};
