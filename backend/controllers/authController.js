import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Username already exists!' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = {
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    };

    const createdUser = await User.create(newUser);

    generateTokenAndSetCookie(createdUser._id, res);

    res.status(201).json({
      _id: createdUser._id,
      fullName: createdUser.fullName,
      username: createdUser.username,
      profilePic: createdUser.profilePic,
    });
  } catch (error) {
    console.log('Error in signup controller: ', error.message);
    return res.status(500).json({ error: 'Interval server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Error in login controller: ', error.message);
    return res.status(500).json({ error: 'Interval server error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller: ', error.message);
    return res.status(500).json({ error: 'Interval server error' });
  }
};
