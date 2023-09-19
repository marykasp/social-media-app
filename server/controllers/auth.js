import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
  // similar to api call - make call to mongoDB
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // create random salt - encrypt password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create a new user with request body information
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // save the user
    const savedUser = await newUser.save();
    // respond with a code of 201 and send back user as json
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // mongoose to try to find user with specified email - return user info
    const user = await User.findOne({ email: email });

    // if user is not found - return error
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // compare password send vs user password - compare the same salt to compare hashes
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    // create token for user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete password so not sent to frontend
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
