// import User from '../models/user.model.js';
// import uploadCloudinary from "../config/cloudinary.js";
// import bcrypt from "bcryptjs";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error fetching current user: ${error}` });
  }
}

// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName, imageUrl } = req.body;
//     let assistantImage;

//     if (req.file) {
//       assistantImage = await uploadCloudinary(req.file.path);
//     } else {
//       assistantImage = imageUrl;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { assistantName, assistantImage },
//       { new: true, select: "-password -__v" }
//     );
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: `Error updating assistant: ${error}` });
//   }
// }


// Assume currentUser is your mock user object defined somewhere accessible

// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName } = req.body;
//     let imageUrl = req.body.imageUrl; // fallback if no file uploaded

//     if (req.file) {
//       imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
//     }

//     // Update the mock user data
//     currentUser.assistantName = assistantName;
//     currentUser.assistantImage = imageUrl;

//     console.log('Updated user:', currentUser);

//     res.json({
//       assistantName: currentUser.assistantName,
//       assistantImage: currentUser.assistantImage,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: `Error updating assistant: ${error}` });
//   }
// }


export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;
    if(req.file){
      assistantImage = await uploadOnCloudinary(req.file.path);
    }else{
      assistantImage = imageUrl;
    }
    const user= await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true, select: "-password -__v" }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error updating assistant: ${error}` });
  }
}