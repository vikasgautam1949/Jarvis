import User from '../models/user.model.js';

import bcrypt from "bcryptjs";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // Assuming user is set in the request by isAuth middleware
    const user = await User.findById(user).select("-password -__v");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error fetching current user: ${error}` });
  }
}


