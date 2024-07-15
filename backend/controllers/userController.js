import User from '../models/userModel.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log('Error in getUsersForSidebar controller: ', error.message);
    return res.status(500).json({ error: 'Interval server error' });
  }
};
